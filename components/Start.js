import React from 'react';
import { StyleSheet, Pressable, View, Text, Button, TextInput } from 'react-native';
import { ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur';
import myImage from '../assets/blob-background.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFaceLaugh } from '@fortawesome/free-solid-svg-icons';

export default class Start extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            backgroundColor: textColor
        };
    }

    setBackgroundColor(color) {
        this.setState({
            backgroundColor: color
        })
    }

    render() {
        return (
            <View style={styles.container}>

                <ImageBackground source={myImage} resizeMode="cover" style={styles.image}>

                    <BlurView
                        intensity={80}
                        tint="light"
                        style={styles.blurContainer}>

                        <View>
                            {/* <FontAwesomeIcon color={textColor} size={100} icon={faCoffee} /> */}
                            <FontAwesomeIcon color={this.state.backgroundColor} size={150} icon={faFaceLaugh} />
                        </View>
                        <Text style={styles.title}>
                            Let's Chat
                        </Text>

                        <View style={styles.leftAlignedContainer}>


                            <Text style={styles.labels}>
                                Nickname
                            </Text>

                            <TextInput
                                style={styles.userInput}
                                onChangeText={(text) => this.setState({ name: text })}
                                value={this.state.name}
                                placeholder='Type name here...'
                            />

                            <Text style={styles.labels}>
                                Background Color
                            </Text>

                            <View style={styles.colorPicker} >
                                <Pressable onPress={() => this.setBackgroundColor('#ff9aa2')}>
                                    <View style={styles.circle1}></View>
                                </Pressable>
                                <Pressable onPress={() => this.setBackgroundColor('#ffb7b2')}>
                                    <View style={styles.circle2}></View>
                                </Pressable>
                                <Pressable onPress={() => this.setBackgroundColor('#ffdac1')}>
                                    <View style={styles.circle3}></View>
                                </Pressable>
                                <Pressable onPress={() => this.setBackgroundColor('#e2f0cb')}>
                                    <View style={styles.circle4}></View>
                                </Pressable>
                                <Pressable onPress={() => this.setBackgroundColor('#b5ead7')}>
                                    <View style={styles.circle5}></View>
                                </Pressable>
                                <Pressable onPress={() => this.setBackgroundColor('#c7ceea')}>
                                    <View style={styles.circle6}></View>
                                </Pressable>
                            </View>
                        </View>

                        <Button
                            title="Start Chatting"
                            color='#f194ff'
                            backgroundColor='gray'
                            onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, backgroundColor: this.state.backgroundColor })}>
                        </Button>

                    </BlurView>
                </ImageBackground>
            </View>
        )
    }
}

const colorPickerCircleSize = 40;
const circleMargin = 10;
const sectionSpacing = 30;
const atomicRadius = 4;
const textColor = '#777';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    blurContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 48,
        paddingBottom: 48
    },
    leftAlignedContainer: {
        height: 'auto',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: textColor,
        marginTop: 16,
        marginBottom: 24,
    },
    labels: {
        fontSize: 18,
        color: textColor,
        marginTop: 16,
        marginBottom: atomicRadius
    },
    userInput: {
        height: 40,
        borderColor: textColor,
        borderWidth: 1,
        marginTop: atomicRadius,
        marginBottom: sectionSpacing,
        borderRadius: 4,
        width: 200
    },
    colorPicker: {
        flexDirection: 'row',
        marginTop: atomicRadius,
        marginBottom: sectionSpacing
    },
    circle1: {
        height: colorPickerCircleSize,
        width: colorPickerCircleSize,
        borderRadius: colorPickerCircleSize / 2,
        backgroundColor: '#ff9aa2',
        marginEnd: circleMargin
    },
    circle2: {
        height: colorPickerCircleSize,
        width: colorPickerCircleSize,
        borderRadius: colorPickerCircleSize / 2,
        backgroundColor: '#ffb7b2',
        marginEnd: circleMargin
    },
    circle3: {
        height: colorPickerCircleSize,
        width: colorPickerCircleSize,
        borderRadius: colorPickerCircleSize / 2,
        backgroundColor: '#ffdac1',
        marginEnd: circleMargin
    },
    circle4: {
        height: colorPickerCircleSize,
        width: colorPickerCircleSize,
        borderRadius: colorPickerCircleSize / 2,
        backgroundColor: '#e2f0cb',
        marginEnd: circleMargin
    },
    circle5: {
        height: colorPickerCircleSize,
        width: colorPickerCircleSize,
        borderRadius: colorPickerCircleSize / 2,
        backgroundColor: '#b5ead7',
        marginEnd: circleMargin
    },
    circle6: {
        height: colorPickerCircleSize,
        width: colorPickerCircleSize,
        borderRadius: colorPickerCircleSize / 2,
        backgroundColor: '#c7ceea',
        marginEnd: circleMargin
    },
})