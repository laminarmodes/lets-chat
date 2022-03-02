import React from 'react';
import { View, Text, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { back } from 'react-native/Libraries/Animated/Easing';


export default class Chat extends React.Component {

    constructor() {
        super();
        this.state = {
            messages: []
        }
    }

    componentDidMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 1,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any'
                    }
                },
                {
                    _id: 2,
                    text: 'How are you?',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'Guest',
                        avatar: 'https://placeimg.com/140/140/any'
                    }
                },
                {
                    _id: 3,
                    text: 'Hi',
                    createdAt: new Date(),
                    user: {
                        _id: 3,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any'
                    }
                }
            ],
        })
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
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
                    user={{
                        _id: 1,
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