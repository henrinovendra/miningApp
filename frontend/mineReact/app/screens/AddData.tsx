import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Image} from 'react-native';
import {Button} from 'react-native';
import {View} from 'react-native';
import {Text} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";

//root component
const AddData = props => {
  //state Data
  const [sj, setSj] = useState('');
  const [maxSJ, setMaxSj] = useState('');
  const [nopol, setNopol] = useState('');
  const [driver, setDriver] = useState('');
  const [site, setSite] = useState('');
  const [transportir, setTransportir] = useState('');
  const [berat, setBerat] = useState('');
  const [status, setStatus] = useState(0);
  //state Image or file
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('');
  const [type, setType] = useState('');
  const baseUrl = 'http://10.10.8.101/';

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
        const data = res.assets[0];
        setImage(data.uri);
        setFileName(data.fileName);
        setType(data.type);
      }
    });
  };

  const maximumSJ = async () => {
    await fetch(baseUrl + 'api/maxsj', {
      method: 'get',
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        const maxSJ = res.data + 1;
        setSj(maxSJ.toString())
      });
  };
  useEffect(() => {
    maximumSJ();
  }, []);
  //component set FormData to post API
  const data = new FormData();
  data.append('sj', sj);
  data.append('nopol', nopol);
  data.append('driver', driver);
  data.append('site', site);
  data.append('transportir', transportir);
  data.append('berat', berat);
  data.append('status', status);
  data.append('image', {
    uri: image,
    name: fileName,
    fileName: 'image',
    type: 'image/png',
  });
  //Component submit data to API
  const submit = async() => {
    const token =  await AsyncStorage.getItem('token');

    fetch('http://10.10.8.101/api/data', {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization' :`Bearer ${token}`
      },
      body: data,
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        setFileName('');
        setImage(null);
        setSj('');
        setBerat('');
        setDriver('');
        setNopol('');
        setSite('');
        setTransportir('');
        alert('data berhasil di simpan');
        props.navigation.push('Fetch');
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <ScrollView>
      <View style={styles.container}>
      
        <View style={styles.content}>
          {/* FORM NO SJ */}
          <View style={styles.form}>
            <Text style={styles.label}> Nomor SJ</Text>
            <TextInput
              editable={false}
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
              placeholder="Input Nomor Polisi"
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
              placeholder="Input Nama Driver"
              value={driver}
              onChangeText={value => setDriver(value)}
              style={styles.inputText}
            />
          </View>
          {/* END FORM DRIVER */}

          {/* FORM site */}
          <View style={styles.form}>
            <Text style={styles.label}> Site</Text>
            <TextInput
              placeholder="Input Site"
              value={site}
              onChangeText={value => setSite(value)}
              style={styles.inputText}
            />
          </View>
          {/* END FORM site */}

          {/* FORM Transportir */}
          <View style={styles.form}>
            <Text style={styles.label}> transportir</Text>
            <TextInput
              placeholder="Input Transportir"
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
              placeholder="Input Berat"
              value={berat}
              onChangeText={value => setBerat(value)}
              style={styles.inputText}
              keyboardType="number-pad"
            />
          </View>
          {/* END FORM BERAT */}
          <View style={{alignItems:'center'}}>
            {image != null && (
              <Image source={{uri: image}} style={{width: 150, height: 150}} />
            )}
          </View>
          <View style={styles.containerButton}>
            <TouchableOpacity
              onPress={openGaleryPhone}
              style={styles.OpenGalery}>
              <Text style={styles.textButton}> Galery</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openCamera} style={styles.OpenGalery}>
              <Text style={styles.textButton}> Camera</Text>
            </TouchableOpacity>
          </View>
          <Button title="Save" onPress={submit} />
        </View>
      </View>
    </ScrollView>
  );
};
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
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 5,
    backgroundColor: '#8F43EE',
    marginHorizontal: 4,
  },
  textButton:{
    color:'white'
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
export default AddData;
