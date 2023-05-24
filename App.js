import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';
import image from './assets/AlfonsoM0.png';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import * as Sharing from 'expo-sharing';

export default function App() {
  const [selectedImg, setSelectedImg] = useState(null);

  let openImagePickerAsync = async () => {
    let permissioResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissioResult.granted === false) {
      Alert.alert('Permission required');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.canceled === true) return;

    if (Platform.OS === 'web') {
    } else {
      setSelectedImg({
        localUri: pickerResult.uri,
      });
    }
  };

  const openShareDialog = async () => {
    if (!(await Sharing.isAvailableAsync()))
      return Alert.alert('Sharing is not available in your platform.');

    await Sharing.shareAsync(selectedImg.localUri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World!</Text>
      <TouchableOpacity>
        <Image
          style={styles.img}
          // source= {Image}
          source={{
            uri: selectedImg
              ? selectedImg.localUri
              : 'https://alfonso.ar/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FYoFormal2.815a2fc7.png&w=384&q=75',
          }}
        />
      </TouchableOpacity>

      <Button
        color="red"
        title="Press Me"
        onPress={() => Alert.alert('Hello Button')}
      />

      <TouchableOpacity style={styles.btn} onPress={openImagePickerAsync}>
        <Text style={styles.btn_text}>Change Img</Text>
      </TouchableOpacity>

      {selectedImg ? (
        <Button color="green" title="Share" onPress={openShareDialog} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#292929',
  },
  title: { fontSize: 30, color: '#fff' },
  img: { width: 180, height: 180, borderRadius: 45, resizeMode: 'contain' },
  btn: { backgroundColor: 'blue', padding: 7, marginTop: 10 },
  btn_text: { color: '#fff', fontSize: 20 },
});

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Hello World!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
