import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';


import { useLogin } from './context/LoginProvider';
import Home from './screens/Home';
import Fetch from './screens/Fetch';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddData from './screens/AddData';
import UpdateData from './screens/UpdateData';
import client from './api/client';

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

const HomeScreen=()=> {

  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='Fetch' component={Fetch}/>
      <Stack.Screen name='AddData' component={AddData}/>
      <Stack.Screen name='UpdateData' component={UpdateData}/>
    </Stack.Navigator>
  )
}


const CustomDrawer = props => {
  const { setIsLoggedIn, profile } = useLogin();

  const logout = async()=>{
    try {
      const res = await client.delete('/logout');
      if(res){
        setIsLoggedIn(false)
      }
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 20,
            backgroundColor: 'white',
            marginBottom: 20,
          }}
        >
          <View>
            
          </View>
          <Image
            source={{
              uri:
                
                'https://images.unsplash.com/photo-1624243225303-261cc3cd2fbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
            }}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 0,
          left: 0,
          bottom: 50,
          backgroundColor: '#f6f6f6',
          padding: 20,
        }}
        onPress={logout}
      >
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: 'white',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitle: '',
      }}
      drawerContent={props => <CustomDrawer {...props} />}
    >
      <Drawer.Screen component={HomeScreen} name='HomeScreen' />

    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
