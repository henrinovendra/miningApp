import {
    Image,
    StyleSheet,
    TouchableOpacity,
    RefreshControl,
    ScrollView,
    View,
    Text,
    SafeAreaView,
    Modal,
    Alert
  } from 'react-native';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import client from '../api/client';
import AntDesign from 'react-native-vector-icons/AntDesign';
import jwt_decode from "jwt-decode";
import { StackActions } from '@react-navigation/native';
import { useLogin } from '../context/LoginProvider';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Fetch = props => {
    const [checked, setChecked] = React.useState('');
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [token, setToken] = useState('');
    const [expires, setExpires]=useState('')
    const { setIsLoggedIn, profile } = useLogin();


    const handleDelete =async (prop)=>{
      const id = prop.id
      const res = await client.delete('/api/data/'+id)
      if (res){
        props.navigation.push('Fetch')
      }
    }
   
    const getListData = async()=>{
        const res = await client.get('/api/data');
        if(res.data.success){
            setData(res.data.data);
        }
    }
    const axiosJWT = axios.create();
    axiosJWT.interceptors.request.use(async(config)=>{
      const currenDate = new Date();
      if(expires * 1000< currenDate.getTime()){
        const res = await client.get('/token');
        config.headers.Authorization =`Bearer ${res.data.accessToken}`;
        setToken(res.data.accessToken);
        const decode = jwt_decode(res.data.accessToken);
        setExpires(decode.exp)
      }  
      return config;

      },
      (err)=>{
        return Promise.reject(err);
    })  
    
    const refreshToken = async() =>{
      try{  
        const res = await client.get('/token');

          setToken(res.data.accessToken);
          const decoded = jwt_decode(res.data.accessToken)
          await AsyncStorage.setItem('token', res.data.accessToken)
          console.log(res.data.accessToken)
      }
      catch(err){
        if(err.res){
          props.dispatch(
            StackActions.replace('Appform')
          );
        }
      }
    }
    useEffect(() => {
        refreshToken();
        getListData();
      }, []);
  return (
    <SafeAreaView style = {styles.container}>
       <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={getListData} />
      }>
        
      <View style={styles.content}>
        <Text> Data Unload</Text>
        {data.map((item, index) => {
          return (
            <View key={index} >
              <TouchableOpacity style={styles.card}
                onPress={() =>
                  props.navigation.push('UpdateData', {
                    id: item.id,
                    token:token
                  })
                }
                onLongPress={()=>Alert.alert('Peringatan', 'Anda Yakin akan Menghapus data ini ?',[
                  {
                    text:'tidak',
                    onPress:()=>console.log("tidak")
                  },
                  {
                    text:'Iya',
                    onPress:() =>handleDelete({
                      id:item.id,
                      nama :item.nama
                    })
                  }
                ]
                )}>
                <Image style={styles.images} source={{uri: item.url}} />
              <View style={styles.textView}>
                <Text>No SJ: {item.sj}</Text>
                <Text>Driver: {item.driver}</Text>
                <Text>Nopol: {item.nopol}</Text>
              </View>
              <View style={styles.textView}>
                <Text>Site: {item.site}</Text>
                <Text>Berat: {item.berat}</Text>
                <Text>Perusahaan: {item.transportir}</Text>
              </View>
              </TouchableOpacity>

            </View>
          );
        })}
      </View>

      
    </ScrollView>
    <TouchableOpacity style={styles.icon}
          onPress={() => {
            props.navigation.push('AddData', {
              token:token
            })
          }}>
        
       <AntDesign name="pluscircle" size={50} />
       
        </TouchableOpacity>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtHeader: {
    fontSize: 22,
    color: 'black',
  },
  content: {
    flex: 1,
    marginVertical: 10,
    padding: 10,
    justifyContent: 'space-around',
  },
  textView: {
    marginHorizontal: 3,
  },
  card: {
    padding: 10,
    backgroundColor: 'white',
    marginVertical: 5,
    borderRadius: 10,
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  images: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  check: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  icon:{
    position:'absolute',
    flex:1,
    bottom:15,
    right:15
  }
})
export default Fetch