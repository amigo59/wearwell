// FavoritesScreen.js
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import BaseLayout from './BaseLayout';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from './AuthContext';
import imageMap from './imageMap';
import { useLanguage } from './LanguageContext';
import { ThemeContext } from './ThemeContext';
import { defaultTheme, lightTheme, darkTheme } from './Theme';
import { selectDatabaseFunctions } from './DBSelection';

const FavoritesScreen = () => {
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);
    const { translations } = useLanguage();
    const [favorites, setFavorites] = useState([]);
    const { themeMode } = useContext(ThemeContext);
    const theme = themeMode === 'dark' ? darkTheme : (themeMode === 'light' ? lightTheme : defaultTheme);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (user) {
                try {
                    const DB = await selectDatabaseFunctions();
                    const favProducts = await DB.fetchFavoritesFromDatabase(user.id);
                    setFavorites(favProducts);
                } catch (error) {
                    console.error('Erreur lors de la récupération des favoris:', error);
                }
            }
        };

        fetchFavorites();
    }, [user]);

    const renderItem = ({ item }) => {
        const productImage = item.ImageURL ? imageMap[item.ImageURL] : null;

        return (
            <TouchableOpacity
                style={theme.favoritesCard}
                onPress={() => navigation.navigate('ProductDetails', { product: item })}
            >
                {productImage && <Image source={productImage} style={theme.favoritesProductImage} />}
                <View style={theme.favoritesTextContainer}>
                    <Text style={theme.favoritesProductName}>{item.ProductName}</Text>
                    <Text style={theme.favoritesProductScore}>
                        {translations['FavoritesScreen']?.['productScore'].replace('{score}', item.SustainabilityScoreID)}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    if (favorites.length === 0) {
        return (
            <BaseLayout navigation={navigation}>
                <View style={theme.favoritesScreenContainer}>
                    <Text>{translations['FavoritesScreen']?.['noFavorites']}</Text>
                </View>
            </BaseLayout>
        );
    }

    return (
        <BaseLayout navigation={navigation}>
            <FlatList
                style={theme.favoritesScreenContainer}
                data={favorites}
                renderItem={renderItem}
                keyExtractor={item => item.ProductID.toString()}
            />
        </BaseLayout>
    );
};

export default FavoritesScreen;
