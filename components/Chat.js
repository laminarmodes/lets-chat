import React from 'react';
import { View, Text } from 'react-native';
import { useEffect } from 'react';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';


export default class Chat extends React.Component {
    render() {

        let name = this.props.route.params.name;
        let backgroundColor = this.props.route.params.backgroundColor;

        this.props.navigation.setOptions({
            title: name
        });

        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: backgroundColor
                }}>
                <Text>Hello {name} </Text>
                {/* <Text>The color selected was {backgroundColor} </Text> */}
            </View>
        );
    };
}