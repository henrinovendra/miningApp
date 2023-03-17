import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import LoginProvider from './app/context/LoginProvider'
import MainNavigator from './app/MainNavigator'
import DrawerNavigator from './app/DrawerNavigator'
import 'react-native-gesture-handler';


export class App extends Component {
  render() {
    return (  
     
      <LoginProvider>
        <NavigationContainer>
          <MainNavigator/>
        </NavigationContainer>
      </LoginProvider>
    
    )
  }
}

export default App