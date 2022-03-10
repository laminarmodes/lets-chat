import React from 'react';
import { View, Text, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { back } from 'react-native/Libraries/Animated/Easing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const firebase = require('firebase');
require('firebase/firestore');

import { collection, addDoc, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAzCN2Nfra9KQTtrn9J40haL5G9eMFR6Kk",
    authDomain: "chat-38cf6.firebaseapp.com",
    projectId: "chat-38cf6",
    storageBucket: "chat-38cf6.appspot.com",
    messagingSenderId: "731820327200",
    appId: "1:731820327200:web:8edc068ba3db13416b5745",
    measurementId: "G-SJP57Y4013"
};

export default class Chat extends React.Component {
    constructor() {
        super();

        this.state = {
            messages: [],
            uid: 0,
            user: {
                _id: '',
                name: '',
                avatar: '',
            },
            isConnected: false,
            image: null,
            location: null
        }
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        this.referenceChatMessages = firebase.firestore().collection('messages');
        this.referenceChatUser = null;
    }

    async deleteMessages() {
        try {
            await AsyncStorage.removeItem('messages');
            this.setState({
                messages: []
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    async getMessages() {
        let messages = '';
        try {
            // Retreive chat message, if no storage item set message to be empty
            messages = await AsyncStorage.getItem('messages') || [];

            // Update messages
            this.setState({
                messages: JSON.parse(messages)
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    componentDidMount() {

        NetInfo.fetch().then((connection) => {

            const firebaseTest = false;

            // 
            if (connection.isConnected) {

                console.log('online');
                this.setState({
                    isConnected: true
                });
                // Set the page title once Chat is loaded
                let { name } = this.props.route.params

                // Adds the name to top of screen
                this.props.navigation.setOptions({ title: name })

                // Let user sign in anonymously
                this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
                    if (!user) {
                        // Calls the firebase authentication service
                        firebase.auth().signInAnonymously();
                    }

                    this.setState({
                        messages: [],
                        uid: user.uid,
                        user: {
                            _id: user.uid,
                            name: name,
                            avatar: 'https://placeimg.com/140/140/any'
                        },
                    });

                    // 1. Create a reference to the active user's documents (messages)
                    this.unsubscribe = this.referenceChatMessages.orderBy("createdAt", "desc").onSnapshot(this.onCollectionUpdate);

                    // 2. Create entirely new observer
                    this.referenceChatUser = firebase.firestore().collection("messages").where("uid", "==", this.state.uid);

                    // 3. Delete original listener
                    this.referenceChatMessages = firebase.firestore().collection('messages');
                    if (this.referenceChatMessages != null) {
                        this.unsubscribe = this.referenceChatMessages.onSnapshot(this.onCollectionUpdate)
                    }

                });
            } else {
                this.setState({
                    isConnected: false,
                });
                console.log('offline');
                this.getMessages();
            }
        });
    }

    // componentWillUnmount() {
    //     this.authUnsubscribe();
    //     this.unsubscribe();
    // }



    // Set the message state to be the current data
    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        // Go through each document
        querySnapshot.forEach((doc) => {
            // Get the QueryDocumentSnapshot's data
            var data = doc.data();
            // Each message saved into the messages object
            messages.push({
                _id: data._id,
                text: data.text,
                createdAt: data.createdAt.toDate(),
                user: {
                    _id: data.user._id,
                    name: data.user.name,
                    avatar: data.user.avatar
                },
                image: data.image || null,
                location: data.location || null
            });
        });
        // render messages
        this.setState({
            messages: messages
        });
    };

    async saveMessages() {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
        } catch (error) {
            console.log(error.message);
        }
    }

    // Add message to the database
    addMessages() {
        const message = this.state.messages[0]
        this.referenceChatMessages.add({
            _id: message._id,
            text: message.text || '',
            createdAt: message.createdAt,
            user: this.state.user,
            image: message.image || null,
            location: message.location || null
        });
        // _id: this.state.uid,
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }), () => {
            // Save messages
            this.saveMessages();
            // Add messages
            this.addMessages();
        })
    }

    renderInputToolbar(props) {
        if (this.state.isConnected == false) {

        } else {
            return (<InputToolbar {...props} />);
        }
    }

    renderCustomActions = (props) => <CustomActions {...props} />;

    renderCustomView(props) {
        const { currentMessage } = props;
        if (currentMessage.location) {
            return (
                <MapView
                    style={{
                        width: 150,
                        height: 100,
                        borderRadius: 13,
                        margin: 3
                    }}
                    region={{
                        latitude: currentMessage.location.latitude,
                        longitude: currentMessage.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            );
        }
        return null;
    }

    render() {
        let name = this.props.route.params.name;
        let backgroundColor = this.props.route.params.backgroundColor;

        this.props.navigation.setOptions({
            title: name
        });

        return (

            <View style={{
                flex: 1,
                backgroundColor: backgroundColor
            }}>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    renderInputToolbar={this.renderInputToolbar.bind(this)}
                    renderActions={this.renderCustomActions}
                    renderCustomView={this.renderCustomView}
                    user={{
                        _id: this.state.user._id,
                        name: this.state.name,
                        avatar: this.state.user.avatar
                    }}
                />
                {
                    Platform.OS === "android" ? (
                        <KeyboardAvoidingView behavior="height" />
                    ) : null
                }
            </View>
        );
    };
}

