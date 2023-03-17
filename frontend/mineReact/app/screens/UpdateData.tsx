import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {Component, useEffect, useState} from 'react';
import {Button, TouchableOpacity} from 'react-native';
import {Image, ScrollView, StyleSheet} from 'react-native';
import {View, Text, TextInput} from 'react-native';
import { CheckBox } from 'react-native-elements';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import client from '../api/client';


const UpdateData = props => {
  const baseUrl = 'http://10.10.8.101/';
  const [data, setData] = useState([]);
  const [sj, setSj] = useState('');
  const [nopol, setNopol] = useState('');
  const [driver, setDriver] = useState('');
  const [site, setSite] = useState('');
  const [transportir, setTransportir] = useState('');
  const [berat, setBerat] = useState('');
  const [status, setStatus] = useState(0);
  //state Image or file
  const [image, setImage] = useState(null);
  const [newImage, setNewImage] = useState(false);
  //state Image or file
  const [fileName, setFileName] = useState('');
  const [type, setType] = useState('');
  const [checkBox, setCheckBox]= useState('');
  //component openCamera
  const openGaleryPhone = () => {
    const option = {
      mediaType: 'image',
      quality: 1,
      base64: false,
    };
    launchImageLibrary(option, res => {
      if (res.didCancel) {
        console.log('cancel');
      } else if (res.errorCode) {
        console.log(res.errorMessage);
      } else {
        const data = res.assets[0];
        setImage(data.uri);
        setFileName(data.fileName);
        setType(data.type);
        setNewImage(true);
      }
    });
  };
  const openCamera = () => {
    const option = {
      mediaType: 'image',
      quality: 1,
      base64: false,
    };
    launchCamera(option, res => {
      if (res.didCancel) {
        console.log('cancel');
      } else if (res.errorCode) {
        console.log(res.errorMessage);
      } else {
        setImage(res.assets[0].uri);
        setFileName(res.assets[0].fileName);
        setType(res.assets[0].type);
        setNewImage(true);
      }
    });
  };

  const json = new FormData();
  json.append('sj', sj);
  json.append('nopol', nopol);
  json.append('driver', driver);
  json.append('site', site);
  json.append('transportir', transportir);
  json.append('berat', berat);
  json.append('status', checkBox);
  if (newImage == true) {
    json.append('image', {
      uri: image,
      name: fileName,
      fileName: 'image',
      type: 'image/png',
    });
  } else {
    json.append('image', null);
  }
  const onChangeValue =()=>{
    setCheckBox (!checkBox)
  }
  const token = props.route.params.token
  const submit = async() => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    fetch('http://10.10.8.101/api/data/' + props.route.params.id, {

      method: 'patch',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization' :`Bearer ${token}`
      },
      body: json,
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        setFileName('');
        setSj('');
        setBerat('');
        setDriver('');
        setNopol('');
        setSite('');
        setTransportir('');
        alert('data berhasil di UpdateData');
        props.navigation.push('Fetch');
      })
      .catch(error => {
        console.log(error);
      });
  };
  const getItem = async () => {
    await fetch(baseUrl + 'api/data/' + props.route.params.id, {
      method: 'get',
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        setData(res);
        console.log(res);
        setSj(res.sj.toString());
        setBerat(res.berat.toString());
        setImage(res.url);
        setDriver(res.driver);
        setNopol(res.nopol);
        setSite(res.site);
        setTransportir(res.transportir);
        setCheckBox(res.status);
      });
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        
        <View style={styles.content}>
          {/* FORM NO SJ */}
          <View style={styles.form}>
            <Text style={styles.label}> Nomor SJ</Text>
            <TextInput
              placeholder="Input Nomor Sj"
              value={sj}
              onChangeText={value => setSj(value)}
              style={styles.inputText}
            />
          </View>
          {/* END FORM SJ */}

          {/* FORM NO POLISI */}
          <View style={styles.form}>
            <Text style={styles.label}> No Polisi</Text>
            <TextInput
              placeholder="Input Nomor Sj"
              value={nopol}
              onChangeText={value => setNopol(value)}
              style={styles.inputText}
            />
          </View>
          {/* END FORM NO POLISI */}

          {/* FORM DRIVER */}
          <View style={styles.form}>
            <Text style={styles.label}> Driver</Text>
            <TextInput
              placeholder="Input Nomor Sj"
              value={driver}
              onChangeText={value => setDriver(value)}
              style={styles.inputText}
            />
          </View>
          {/* END FORM DRIVER */}

          {/* FORM DRIVER */}
          <View style={styles.form}>
            <Text style={styles.label}> Site</Text>
            <TextInput
              placeholder="Input Nomor Sj"
              value={site}
              onChangeText={value => setSite(value)}
              style={styles.inputText}
            />
          </View>
          {/* END FORM DRIVER */}

          {/* FORM Transportir */}
          <View style={styles.form}>
            <Text style={styles.label}> transportir</Text>
            <TextInput
              placeholder="Input Nomor Sj"
              value={transportir}
              onChangeText={value => setTransportir(value)}
              style={styles.inputText}
            />
          </View>
          {/* END FORM Transportir */}

          {/* FORM BERAT */}
          <View style={styles.form}>
            <Text style={styles.label}> Berat</Text>
            <TextInput
              placeholder="Input Nomor Sj"
              value={berat}
              onChangeText={value => setBerat(value)}
              style={styles.inputText}
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.form, styles.status}>
            <Text style={styles.label}> Status: </Text>
            <CheckBox checked={checkBox} onPress={onChangeValue} />
            {
              checkBox==true && (
                <Text style={styles.label}> Sudah Loading</Text>
              )
            }
            {
              checkBox==false && (
                <Text style={styles.label}> Belum Loading</Text>
              )
            }
          </View>
          {/* END FORM BERAT */}
          <View style={styles.imageView}>
            <Text style={styles.label}> Foto :</Text>
            {newImage == true && (
              <Image source={{uri: image}} style={{width: 150, height: 150, marginHorizontal:10}} />
            )}
            {
              newImage==false && (
                <Image source={{uri: image}} style={{width: 150, height: 150, marginHorizontal:10}} />

              )
            }
          </View>
          <View style={styles.containerButton}>
            <TouchableOpacity
              onPress={openGaleryPhone}
              style={styles.OpenGalery}>
              <Text> Galery</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openCamera} style={styles.OpenGalery}>
              <Text> Camera</Text>
            </TouchableOpacity>
          </View>
          <Button title="Save" onPress={submit} />
        </View>
      </View>
    </ScrollView>
  );
};
export default UpdateData;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  header: {
    backgroundColor: 'white',
    padding: 10,
    elevation: 3,
  },
  content: {
    marginVertical: 10,
    padding: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  inputText: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    marginVertical: 5,
  },
  OpenGalery: {
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 5,
    backgroundColor: 'lightblue',
    marginHorizontal: 4,
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  status:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:-15
  },
  form:{
    marginBottom:10
  },
  imageView:{
    flexDirection: 'row',
  }
});
