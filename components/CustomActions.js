import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import firebase from 'firebase';

export default class CustomActions extends React.Component {

    imagePicker = async () => {

        // Ask for permission
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        try {
            if (status === 'granted') {
                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                }).catch((error) => console.log(error));
                if (!result.cancelled) {
                    const imageUrl = await this.uploadImageFetch(result.uri);
                    this.props.onSend({
                        image: imageUrl
                    });
                }
            }

        } catch (error) {
            console.log(error.message);
        }
    };

    takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        try {
            if (status === 'granted') {
                const result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                }).catch((error) => console.log(error));

                if (!result.cancelled) {
                    const imageUrl = await this.uploadImageFetch(result.uri);
                    this.props.onSend({
                        image: imageUrl
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    getLocation = async () => {

        const { status } = await Location.requestForegroundPermissionsAsync();
        try {
            if (status === 'granted') {
                let result = await Location.getCurrentPositionAsync({}).catch((error) => console.log(error));
                if (result) {
                    this.props.onSend({
                        location: {
                            longitude: result.coords.longitude,
                            latitude: result.coords.latitude,
                        },
                    });
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    onActionPress = () => {
        const options = ["Choose From Library", "Take Picture", "Send Location", "Cancel"];
        const cancelButtonIndex = options.length - 1;

        // Hands down data to be displayed to the actionSheet component
        this.context.actionSheet().showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        console.log('user wants to pick an image');
                        return this.imagePicker();
                    case 1:
                        console.log('user wants to take a photo');
                        return this.takePhoto();
                    case 2:
                        console.log('user wants to get their location');
                        return this.getLocation();
                }
            }
        );
    };

    // Upload images to firebase
    uploadImageFetch = async (uri) => {

        // To create blob
        const blob = await new Promise((resolve, reject) => {

            // Create a new XMLHttpRequest 
            const xhr = new XMLHttpRequest();
            xhr.onload = function (e) {
                resolve(xhr.response);
            };

            // Set response type to 'blob'
            xhr.responseType = 'blob';

            // Then open connection and retrieve the URI's data via GET
            xhr.open('GET', uri, true);
            xhr.send(null);

        });

        // Get the actual image name
        const imageNameBefore = uri.split("/");
        const imageName = imageNameBefore[imageNameBefore.length - 1];

        // Create a reference to the storage
        const ref = firebase.storage().ref().child(`iamges/${imageName}`);

        // Use put to store the content retrieved from the Ajax request
        const snapshot = await ref.put(blob);

        // Close the connection
        blob.close();

        // Return the image url from the server
        return await snapshot.ref.getDownloadURL();
    };

    render() {
        return (
            <TouchableOpacity
                style={[styles.container]}
                onPress={this.onActionPress} >
                <View style={[styles.wrapper, this.props.wrapperStyle]}>
                    <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
                </View>
            </TouchableOpacity>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
    },
    wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1
    },
    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
});

// Object to define the context type
// PropTypes was imported
// Defines what the props sent to this component should look like
// Here, defining actionSheet as a function
CustomActions.contextTypes = {
    actionSheet: PropTypes.func,
};
