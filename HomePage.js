// HomePage.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import BaseLayout from './BaseLayout';
import { useNavigation } from '@react-navigation/native';
import imageMap from './imageMap'; // Importez l'objet de mappage
//import { fetchProductsFromDatabase, fetchConsultationHistoryFromDatabase, removeFromHistory } from './databaseFunctions';
import { AuthContext } from './AuthContext';
import { useLanguage } from './LanguageContext'; // Importez useLanguage
import { ThemeProvider, ThemeContext } from './ThemeContext';
import { defaultTheme, lightTheme, darkTheme } from './Theme'; // Assurez-vous que le chemin est correct

import { selectDatabaseFunctions } from './DBSelection';
//import DBSelection from './DBSelection';


export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    // Logique pour définir l'utilisateur actuel (peut-être après une connexion réussie)

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
const HomePage = () => {

    useEffect(() => {
        console.log('Langue changée :', language);
        console.log('Traductions actuelles :', translations);
    }, [language, translations]);


    const { translations, switchLanguage, language } = useLanguage(); // Utilisez useLanguage pour accéder aux traductions et à la fonction de changement de langue
    console.log("Langue actuelle :", language); // Affichera 'en' ou 'fr'
    console.log("Traduction pour 'startScan':", translations['startScan']); // Affichera la traduction de 'startScan'

    const navigation = useNavigation();
    const [recommendations, setRecommendations] = useState([]);
    const [consultationHistory, setConsultationHistory] = useState([]);
    //const [showAllHistory, setShowAllHistory] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false); // nouvel état pour gérer l'expansion de l'historique

    // Utilisez useContext pour obtenir l'utilisateur actuel
    // Utilisez useContext pour obtenir l'utilisateur actuel
    const { user } = useContext(AuthContext);
    const { changeTheme } = useContext(ThemeContext);
    const { themeMode } = useContext(ThemeContext);
    const theme = themeMode === 'dark' ? darkTheme : (themeMode === 'light' ? lightTheme : defaultTheme);

    // Obtenez l'ID de l'utilisateur actuel
    const currentUserID = user ? user.id : null;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (!isNaN(date.getTime())) {  // Vérifie que la date est valide
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        } else {
            return 'Date invalide'; // Retourne un texte par défaut si la date est invalide
        }
    };

      const handleToggleHistory = () => {
         setIsExpanded(!isExpanded);
      };

    const displayedHistory = isExpanded ? consultationHistory : consultationHistory.slice(0, 4);

    const handleScanButtonPress = () => {
        navigation.navigate('QRCodeScanner');
    };

    const handleSeeMoreClick = () => {
        navigation.navigate('Recommendations'); // Assurez-vous que le nom correspond à celui défini dans le navigateur
    };

    // Fonction pour gérer la suppression de l'historique
    const handleRemoveFromHistory = async (productId) => {
        try {
            const DB = await selectDatabaseFunctions();
            console.log(`Produit ${productId} supprimé de l'historique pour l'utilisateur ${currentUserID}`);
            if (DB && DB.removeFromHistory) {
                const response = await DB.removeFromHistory(currentUserID, productId);
                console.log(`Response from remove: `, response);
                await fetchConsultationHistory();
                // Mise à jour de l'état pour refléter la suppression côté client
                setConsultationHistory(currentHistory =>
                    currentHistory.filter(item => item.ProductID !== productId)
                );
                console.log(`Produit ${productId} supprimé de l'historique pour l'utilisateur ${currentUserID}`);
            } else {
                console.error("removeFromHistory function not found");
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du produit de l\'historique:', error);
        }
    };


    const addToHistory = (product) => {
        // Ajouter le produit à l'historique et mettre à jour l'état
        setConsultationHistory(currentHistory => {
            // Vérifier si le produit est déjà dans l'historique
            const isAlreadyInHistory = currentHistory.some(item => item.ProductID === product.ProductID);

            if (!isAlreadyInHistory) {
                // Ajouter le nouveau produit en tête de l'historique
                return [{ ...product, ViewedDate: new Date().toISOString() }, ...currentHistory];
            }

            // Si le produit est déjà dans l'historique, retourner l'état actuel
            return currentHistory;
        });
    };


    const handleProductClick = (product) => {
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=Product to Navigate:", product);
        addToHistory(product); // Appeler la fonction pour ajouter à l'historique
        navigation.navigate('ProductDetails', { product });
    };

    const fetchRecommendations = async () => {
        try {
            const DB = await selectDatabaseFunctions();
            if(DB.fetchProductsFromDatabase) {
                const products = await DB.fetchProductsFromDatabase();
                const randomRecommendations = getRandomRecommendations(products);
                setRecommendations(randomRecommendations);
            } else {
                console.error("fetchProductsFromDatabase function not found");
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des recommandations:', error);
        }
    };



    const fetchConsultationHistory = async () => {
        console.log('Current UserID:',currentUserID);
        if (currentUserID) {
            try {
                // Assurez-vous d'avoir accès à l'objet correct contenant vos fonctions de base de données.
                const DB = await selectDatabaseFunctions();
                const history = await DB.fetchConsultationHistoryFromDatabase(currentUserID);
                setConsultationHistory(history);
                console.log('///////////////////////////////////////////////////////////////////////////////////////////////////////////History of the current user:', history);
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'historique de consultation', error);
            }
        } else {
            console.log('Aucun utilisateur actuel pour récupérer l\'historique');
        }
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            await fetchRecommendations();
            await fetchConsultationHistory();
        };

        fetchInitialData();

        // Réinitialise l'état d'expansion lorsqu'on quitte la page
        return () => setIsExpanded(false);
    }, [currentUserID]);

    const getRandomRecommendations = (products) => {
        const randomRecommendations = [];
        const maxRecommendations = 5;
        while (randomRecommendations.length < maxRecommendations && products.length > 0) {
            const randomIndex = Math.floor(Math.random() * products.length);
            const product = products[randomIndex];
            randomRecommendations.push(product);
            products.splice(randomIndex, 1);
        }
        return randomRecommendations;
    };

    return (
        <BaseLayout navigation={navigation} style={{ backgroundColor: theme.backgroundColor }}>
            <ScrollView style={[theme.HomePageContainer, { backgroundColor: theme.backgroundColor }]}>
                <Image source={require('./assets/wearwell.png')} style={theme.HomePageLogo} resizeMode="cover" />

                <View style={theme.HomePageMainFrame}>
                    <Text style={theme.HomePageMainText}>{translations ? translations['startScan'] : 'Loading...'}</Text>
                    <Image source={require('./assets/camera-icon.png')} style={theme.HomePageCameraIcon} />
                    <TouchableOpacity style={theme.HomePageScanButton} onPress={handleScanButtonPress}>
                        <Text style={theme.HomePageButtonText}>{translations ? translations['scanButton'] : 'Loading...'}</Text>
                    </TouchableOpacity>
                </View>

                <View style={theme.HomePageRecommendationsFrame}>
                    <Text style={theme.HomePageFrameTitle}>{translations ? translations['recommendationsTitle'] : 'Loading...'}</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {recommendations.map((product, index) => (
                            <View style={theme.HomePageRecommendationCard} key={index}>
                                <TouchableOpacity onPress={() => handleProductClick(product)}>
                                    <Image
                                        source={imageMap[product.ImageURL]} // Utilisez l'objet de mappage ici
                                        style={theme.HomePageProductImage}
                                        resizeMode="cover"
                                    />
                                    <Text style={theme.HomePageProductName} numberOfLines={2}>
                                        {product.ProductName}
                                    </Text>
                                </TouchableOpacity>
                                <Text style={theme.HomePageScore}>
                                    {translations ? `${translations['scoreLabel']} ${product.SustainabilityScoreId}/100` : 'Loading...'}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>

                    <TouchableOpacity onPress={handleSeeMoreClick} style={theme.HomePageSeeMoreLink}>
                        <Text style={theme.HomePageSeeMoreText}>{translations ? translations['seeMore'] : 'Loading...'}</Text>
                    </TouchableOpacity>
                </View>

                <View style={theme.HomePageHistoryFrame}>
                   <View style={theme.HomePageSpacingBelow}>

                   </View>

                    {/* Scanning History */}
                    <View style={[theme.HomePageSubFrame, theme.HomePageSpacingBelow]}>
                        <Text style={theme.HomePageSubFrameTitle}>{translations ? translations['scanningHistoryTitle'] : 'Loading...'}</Text>
                        {/* Ici, ajoutez le contenu pour l'historique de scan */}
                    </View>

                    {/* Consultation History */}
                    <View style={theme.HomePageSubFrame}>
                        <Text style={theme.HomePageSubFrameTitle}>{translations ? translations['consultationHistoryTitle'] : 'Loading...'}</Text>
                        <ScrollView key={consultationHistory.length}>
                        {displayedHistory.map((product, index) => (
                            <View key={index} style={theme.HomePageHistoryItemContainer}>
                                <TouchableOpacity key={index} style={theme.HomePageHistoryItem} onPress={() => handleProductClick(product)}>
                                    <Image source={imageMap[product.ImageURL]} style={theme.HomePageHistoryImage} />
                                    <View>
                                        <Text style={theme.HomePageHistoryProductName}>{product.ProductName}</Text>
                                        <Text style={theme.HomePageHistoryDate}>{translations ? translations['viewedOn'] + ' ' + formatDate(product.ViewedDate) : 'Loading...'}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleRemoveFromHistory(product.ProductID)}>
                                    <Image source={require('./assets/delete.png')} style={theme.HomePageDeleteIcon} />
                                </TouchableOpacity>
                            </View>
                        ))}
                        </ScrollView>
                       {consultationHistory.length > 3 && (
                           <TouchableOpacity onPress={handleToggleHistory} style={theme.HomePageSeeAllLinkContainer}>
                               <Text style={theme.HomePageSeeAllLink}>
                                   {isExpanded ? translations['seeLess'] : translations['seeMoreHistory']}
                               </Text>
                           </TouchableOpacity>
                       )}
                    </View>

                </View>

            </ScrollView>
        </BaseLayout>
    );
};

export default HomePage;