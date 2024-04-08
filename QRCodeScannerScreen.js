import React, { useEffect, useState } from 'react'; // Ajoutez useEffect ici
import { View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';

const QRCodeScannerScreen = ({ navigation }) => {
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Assurez-vous que le nom de la route 'ScannedProduct' est correct
      navigation.navigate('ScannResult');
    }, 3000); // Navigue après 3 secondes

    return () => clearTimeout(timer); // Nettoie le timer lors du démontage du composant
  }, [navigation]);

  const handleBarCodeScanned = ({ type, data }) => {
    if (!scanned) {
      setScanned(true);
      // Assurez-vous que le nom de la route 'ItemScore' est correct et que vous avez prévu de gérer 'scannedData'
      navigation.navigate('ItemScore', { scannedData: data });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <RNCamera
        style={{ flex: 1 }}
        type={RNCamera.Constants.Type.back}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        onBarCodeRead={handleBarCodeScanned}
        captureAudio={false}
      />
    </View>
  );
};

export default QRCodeScannerScreen;
