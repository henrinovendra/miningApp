import { View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import FormHeader from './FormHeader'
import FormSelectionButton from './FormSelectorBtn'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import axios from 'axios'
import SignupForm from './SignUpForm'

const AppForm = ({ navigation }) => {

  return (
    <View style ={styles.container}>
        <View>
          <FormHeader leftHeading="Welcome" rightHeading="Back" subHeading="Mining AppForm"/>
        </View>
        <View style={{
          flexDirection:'row',
          paddingHorizontal:20, 
          marginBottom:20
          }}>
          <FormSelectionButton backgroundColor='rgba(27,27,51,1)' style ={styles.borderLeft} title="Login"/>
          <FormSelectionButton backgroundColor='rgba(27,27,51,0.4)' style ={styles.borderRight} title="SignUp"/>
        </View>


        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
          
        <LoginForm navigation={navigation} />
          <ScrollView>

            <SignupForm navigation={navigation} />
          </ScrollView>
        </ScrollView>
    </View>
  )
}
 const styles = StyleSheet.create({
  container:{
    flex:1, 
    paddingTop:120
  },
  berderLeft:{
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10
  }, 
  borderRight:{
    borderTopRightRadius:10,
    borderBottomRightRadius:10,
  }
  
 })
export default AppForm