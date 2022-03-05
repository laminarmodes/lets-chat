import React from 'react';
import { View, Text, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { back } from 'react-native/Libraries/Animated/Easing';

// import * as firebase from 'firebase';
// import "firebase/firestore";


// import { initializeApp } from 'firebase/app';

const firebase = require('firebase');
require('firebase/firestore');

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
            }
        }
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        this.referenceChatMessages = firebase.firestore().collection('messages');

    }

    componentDidMount() {

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
                messages: [
                    // {
                    //     _id: 1,
                    //     text: 'Hello developer',
                    //     createdAt: new Date(),
                    //     user: {
                    //         _id: 1,
                    //         name: 'React Native',
                    //         avatar: 'https://placeimg.com/140/140/any'
                    //     }
                    // },
                    // {
                    //     _id: 2,
                    //     text: 'How are you?',
                    //     createdAt: new Date(),
                    //     user: {
                    //         _id: 2,
                    //         name: 'Guest',
                    //         avatar: 'https://placeimg.com/140/140/any'
                    //     }
                    // },
                    // {
                    //     _id: 3,
                    //     text: 'Hi',
                    //     createdAt: new Date(),
                    //     user: {
                    //         _id: 3,
                    //         name: 'React Native',
                    //         avatar: 'https://placeimg.com/140/140/any'
                    //     }
                    // }
                ],
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
    }

    componentWillUnmount() {
        this.authUnsubscribe();
        this.unsubscribe();
    }

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
                }
            });
        });
        // render messages
        this.setState({
            messages,
        });
    };

    // Add message to the database
    addMessages() {
        const message = this.state.messages[0]
        this.referenceChatMessages.add({
            _id: message._id,
            text: message.text || '',
            createdAt: message.createdAt,
            user: this.state.user
        });
        // _id: this.state.uid,
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }), () => {
            // Add messages
            this.addMessages();
        })
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

