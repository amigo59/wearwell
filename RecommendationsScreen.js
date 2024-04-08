// RecommendationsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import BaseLayout from './BaseLayout';
import { useNavigation } from '@react-navigation/native';
import { fetchProductsFromDatabase } from './databaseFunctions';
import { useLanguage } from './LanguageContext'; // Assurez-vous que ce chemin est correct
import imageMap from './imageMap'; // Assurez-vous que ce chemin est correct

const RecommendationsScreen = () => {
    const [products, setProducts] = useState([]);
    const navigation = useNavigation();
    const { translations } = useLanguage(); // Utilisez useLanguage pour accéder aux traductions

    useEffect(() => {
        fetchProductsFromDatabase().then(data => {
            setProducts(data);
        });
    }, []);

    const renderItem = ({ item }) => {
        const productImage = item.ImageURL ? imageMap[item.ImageURL] : null;
        const scoreLabel = translations['RecommendationsScreen']?.['scoreLabel'] ?? 'Score: '; // Utilisez une valeur par défaut au cas où la traduction est manquante

        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('ProductDetails', { product: item })}
            >
                {productImage && <Image source={productImage} style={styles.productImage} />}
                <View style={styles.textContainer}>
                    <Text style={styles.productName}>{item.ProductName}</Text>
                    <Text style={styles.productScore}>{scoreLabel}{item.SustainabilityScoreID}/100</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <BaseLayout navigation={navigation}>
            <View style={styles.container}>
                <FlatList
                    nestedScrollEnabled={true} // Activez le défilement imbriqué
                    data={products}
                    renderItem={renderItem}
                    keyExtractor={item => item.ProductID.toString()}
                />
            </View>
        </BaseLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5E7C5E',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
    textContainer: {
        marginLeft: 10,
        flex: 1,
    },
    productName: {
        fontWeight: 'bold',
        color: '#5E7C5E',
        fontSize: 16,
    },
    productScore: {
        fontSize: 14,
        color: 'green',
    },
    productDescription: {
        fontSize: 12,
        color: 'grey',
    },
});

export default RecommendationsScreen;
