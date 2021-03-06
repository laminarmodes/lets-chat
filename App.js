import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// Import the screens we want to navigate between
import Start from './components/Start';
import Chat from './components/Chat';
import CustomActions from './components/CustomActions';

// Create the navigator
const Stack = createStackNavigator();

export default class App extends React.Component {

  renderCustomActions = (props) => {
    return <CustomActions {...props} />
  };

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Start"
        >
          <Stack.Screen
            name="Welcome"
            component={Start}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
