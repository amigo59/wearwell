//ScanningItemScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { exportDatabase } from './db'; // Importez la fonction d'exportation

const ScanningItemScreen = ({ navigation }) => {
    const handleScan = () => {
        navigation.navigate('QRCodeScanner');
    };

    return (
        <View style={styles.container}>
            <View style={styles.scanArea}>
                {/* Zone de scan */}
                <Image source={require('./assets/camera-icon.png')} style={styles.cameraImage} resizeMode="cover" />
            </View>
            <TouchableOpacity onPress={handleScan} style={styles.scanButton}>
                <Text style={styles.buttonText}>Get Score</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5E7C5E'
    },
    scanArea: {
        width: '90%',
        height: '60%',
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    cameraImage: {
        width: 100,
        height: 100
    },
    scanButton: {
        backgroundColor: '#A3D8A4',
        padding: 10,
        width: '80%',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        fontSize: 18
    }
});

export default ScanningItemScreen;
