//CommunityScreen.js
import React, { useState } from 'react';
import { Modal, ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, Linking, Button } from 'react-native';
import BaseLayout from './BaseLayout';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { useLanguage } from './LanguageContext'; // Assurez-vous d'importer votre hook de langue

const CommunityScreen = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [url, setUrl] = useState('');
    const { translations } = useLanguage(); // Utilisez useLanguage pour accéder aux traductions

    const openModalWithUrl = (newUrl) => {
        setUrl(newUrl);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setUrl('');
    };

    return (
        <BaseLayout navigation={navigation}>
            <ScrollView style={styles.content}>
                {/* Sustainable Community */}
                <TouchableOpacity style={styles.categoryContainer} onPress={() => openModalWithUrl('https://sustain.org/about/what-is-a-sustainable-community/')}>
                    <Image source={require('./assets/sustainable-com.png')} style={styles.categoryImage} />
                    <Text style={styles.title}>{translations['CommunityScreen']?.['CommunityTitle']}</Text>
                    <Text style={styles.description}>{translations['CommunityScreen']?.['CommunityDescription']}</Text>
                    <Text style={styles.learnMore}>{translations['CommunityScreen']?.['learnMore']}</Text>
                </TouchableOpacity>

                {/* Circular Economy Alliance */}
                <TouchableOpacity style={styles.categoryContainer} onPress={() => openModalWithUrl('https://circulareconomyalliance.com/')}>
                    <Image source={require('./assets/circular-eco.png')} style={styles.categoryImage} />
                    <Text style={styles.title}>{translations['CommunityScreen']?.['circularEconomyTitle']}</Text>
                    <Text style={styles.description}>{translations['CommunityScreen']?.['circularEconomyDescription']}</Text>
                    <Text style={styles.learnMore}>{translations['CommunityScreen']?.['learnMore']}</Text>
                </TouchableOpacity>

                {/* Forums */}
                <TouchableOpacity style={styles.categoryContainer} onPress={() => openModalWithUrl('https://www.google.com/search?q=liste+de+forums+sustainability+.org')}>
                    <Image source={require('./assets/search.png')} style={styles.categoryImageSearch} />
                    <Text style={styles.title}>{translations['CommunityScreen']?.['forumsTitle']}</Text>
                    <Text style={styles.description}>{translations['CommunityScreen']?.['forumsDescription']}</Text>
                    <Text style={styles.learnMore}>{translations['CommunityScreen']?.['learnMore']}</Text>
                </TouchableOpacity>
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <WebView source={{ uri: url }} style={{ flex: 1 }} />
                <Button title="Close" onPress={closeModal} />
            </Modal>
        </BaseLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    categoryContainer: {
        padding: 15,
        marginBottom: 15,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    learnMore: {
        fontWeight: 'bold',
        color: '#007bff',
    },
    categoryImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        borderRadius: 8,
        marginBottom: 10,
    },
    categoryImageSearch: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        borderRadius: 8,
        marginBottom: 10,
    }
});

export default CommunityScreen;
