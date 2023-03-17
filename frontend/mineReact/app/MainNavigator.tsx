import { StyleSheet, Text, View } from 'react-native'
import React,{useContext} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AppForm from './components/AppForm';
import Fetch from './screens/Fetch';
import AddData from './screens/AddData';
import UpdateData from './screens/UpdateData';
import { useLogin } from './context/LoginProvider';
import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen component={AppForm} name="AppForm"/>
        
      </Stack.Navigator>
  )
}
const MainNavigator =()=>{
  const { isLoggedIn } = useLogin();
  return isLoggedIn ? <DrawerNavigator /> : <StackNavigator />;
}
export default MainNavigator

