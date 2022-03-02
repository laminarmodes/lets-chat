import React from 'react';
import { StyleSheet, Pressable, View, Text, Button, TextInput } from 'react-native';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export default class Start extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            backgroundColor: 'white'
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
                <Text>Enter your chat name</Text>
                <TextInput
                    style={styles.userInput}
                    onChangeText={(text) => this.setState({ name: text })}
                    value={this.state.name}
                    placeholder='Type name here...'
                />
                <Text style={styles.backgroundColorLabel}>Select a Background Color</Text>
                <View style={styles.colorPicker} >
                    <Pressable onPress={() => this.setBackgroundColor('red')}>
                        <View style={styles.circle1}></View>
                    </Pressable>
                    <Pressable onPress={() => this.setBackgroundColor('orange')}>
                        <View style={styles.circle2}></View>
                    </Pressable>
                    <Pressable onPress={() => this.setBackgroundColor('yellow')}>
                        <View style={styles.circle3}></View>
                    </Pressable>
                </View>
                <Button
                    title="Start Chatting"
                    color='#f194ff'
                    onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, backgroundColor: this.state.backgroundColor })}>
                </Button>
            </View>
        )
    }
}

const colorPickerCircleSize = 40;
const circleMargin = 10;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    colorPicker: {
        flexDirection: 'row'
    },
    userInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 20
    },
    backgroundColorLabel: {
        margin: 10
    },
    circle1: {
        height: colorPickerCircleSize,
        width: colorPickerCircleSize,
        borderRadius: colorPickerCircleSize / 2,
        backgroundColor: 'red',
        margin: circleMargin
    },
    circle2: {
        height: colorPickerCircleSize,
        width: colorPickerCircleSize,
        borderRadius: colorPickerCircleSize / 2,
        backgroundColor: 'orange',
        margin: circleMargin
    },
    circle3: {
        height: colorPickerCircleSize,
        width: colorPickerCircleSize,
        borderRadius: colorPickerCircleSize / 2,
        backgroundColor: 'yellow',
        margin: circleMargin
    },
    startChattingButton: {
        backgroundColor: 'purple',
        height: 40,
        borderRadius: 20
    }
})