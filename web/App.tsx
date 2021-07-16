import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Clipboard, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { uploadImage } from './services/Upload';

export default function App() {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const cameraRollStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (
          cameraRollStatus.status !== 'granted' ||
          cameraStatus.status !== 'granted'
        ) {
          alert('Precisamos das permissões de câmera para funcionar :(');
        }
      }
    })();
  }, []);

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
    });

    handleImagePicked(result);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    handleImagePicked(result);
  };

  const handleImagePicked = async (pickerResult: ImagePicker.ImagePickerResult) => {
    try {
      if (pickerResult.cancelled) {
        alert('Upload cancelado');
        return;
      } else {
        setPercentage(0);
        const blob = await fetchImageFromUri(pickerResult.uri);
        await uploadImage(blob, setLoading);
      }
    } catch (e) {
      console.log(e);
      alert('Falha no upload');
    }
  };

  const setLoading = (progress: { loaded: number; total: number; }) => {
    const calculated = ((progress.loaded / progress.total) * 100).toString();
    updatePercentage(parseInt(calculated));
  };

  const updatePercentage = (number: React.SetStateAction<number>) => {
    setPercentage(number);
  };

  const fetchImageFromUri = async (uri: RequestInfo): Promise<Blob> => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lendo filas da SQS com Lambda</Text>
      <Text style={styles.percentage}>{percentage}%</Text>

      <Button onPress={pickImage} title='Escolha uma imagem da galeria' />
      <div style={{ margin: 4 }}></div>
      <Button onPress={takePhoto} title='Tire uma foto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    marginHorizontal: 15,
  },
  percentage: {
    marginBottom: 10,
  },
  result: {
    paddingTop: 5,
  },
  info: {
    textAlign: 'center',
    marginBottom: 20,
  },
});
