// ProductDetailsScreen.js
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, Button, TouchableOpacity, Iamge } from 'react-native';
import BaseLayout from './BaseLayout';
import { useNavigation } from '@react-navigation/native';
import imageMap from './imageMap'; // Importez l'objet de mappage
import { AuthContext } from './AuthContext';
import { getDB } from './db'; // Assurez-vous que ces fonctions sont définies et importées correctement
//import { addToFavorites, removeFromFavorites, checkIfFavorite, getNumberOfReviewsForProduct } from './databaseFunctions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useLanguage } from './LanguageContext';
import { ThemeProvider, ThemeContext } from './ThemeContext';
import { defaultTheme, darkTheme, lightTheme} from './Theme';
import { selectDatabaseFunctions } from './DBSelection';

const ProductDetailsScreen = ({ route }) => {
    const { product } = route.params;
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);
    const { translations } = useLanguage();
    const [numberOfReviews, setNumberOfReviews] = useState(0);
    const { changeTheme } = useContext(ThemeContext);
    const { themeMode } = useContext(ThemeContext);
    const theme = themeMode === 'dark' ? darkTheme : (themeMode === 'light' ? lightTheme : defaultTheme);

    // Utilisez product.ProductID au lieu de route.params.productID
    const productID = product.ProductID;

    const [isFavorite, setIsFavorite] = useState(false);

   useEffect(() => {
     // Déclaration d'une fonction asynchrone dans le useEffect
     const fetchFavoriteStatus = async () => {
       if (user && product.ProductID) {
         const isFav = await checkIfFavorite(user.id, product.ProductID);
         setIsFavorite(response.isFavorite);
       }
     };

     // Appel de la fonction asynchrone
     fetchFavoriteStatus();
   }, [user, product.ProductID]);

    const checkIfFavorite = async (userId, productId) => {
        try {
            const DB = await selectDatabaseFunctions();
            if (DB && DB.checkIfFavorite) {
                DB.checkIfFavorite(userId, productId).then(response => {
                    setIsFavorite(response.isFavorite);
                    console.log(`Product is favorite: `, response.isFavorite);
                }).catch(error => {
                    console.error('Erreur lors de la vérification des favoris:', error);
                });
            } else {
                console.error("checkIfFavorite function not found");
            }
        } catch (error) {
            console.error('Erreur lors de la sélection de la fonction de base de données:', error);
        }
    };

    const getNumberOfReviewsForProduct = async (productId) => {
        try {
            const DB = await selectDatabaseFunctions();
            if (DB && DB.getNumberOfReviewsForProduct) {
                const response = await DB.getNumberOfReviewsForProduct(productId);
                console.log(`Number of reviews: `, response);
                return response; // Assurez-vous de retourner la réponse ici
            } else {
                console.error("getNumberOfReviewsForProduct function not found");
            }
        } catch (error) {
            console.error('Erreur lors de la récupération du nombre des reviews:', error);
        }
    };

    const addToFavorites = async (userId, productId) => {
        try {
            const DB = await selectDatabaseFunctions();
            console.log(`******************************************************************************Données pour ajouter aux favoris: `, userId, productId);
            if (DB && DB.addToFavorites) {
                const data = await DB.addToFavorites(userId, productId);
                console.log(`Added to Favorites: `, data); // Affichez le résultat de l'API.
                return data; // Retournez la réponse de l'API pour un traitement ultérieur si nécessaire.
            } else {
                console.error("addToFavorites function not found");
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout aux favoris:', error);
        }
    };


    const removeFromFavorites = async (userId, productId) => {
        try {
            const DB = await await selectDatabaseFunctions();
            if (DB && DB.removeFromFavorites) {
                const response = await DB.removeFromFavorites(userId, productId);
                console.log(`Added to Favorites: `, response);
                return response; // Assurez-vous de retourner la réponse ici
            } else {
                console.error("removeFromFavorites function not found");
            }
        } catch (error) {
            console.error('Erreur lors de la suppression des favoris:', error);
        }
    };

    useEffect(() => {
        if (user && product.ProductID) {
            checkIfFavorite(user.id, product.ProductID);
        }
        // Autres opérations...
    }, [user, product.ProductID]);




   useEffect(() => {
       if (product.ProductID) {
           getNumberOfReviewsForProduct(product.ProductID)
               .then(reviewCount => {
                   setNumberOfReviews(reviewCount);
                   console.log(`Nombre de reviews récupéré :`, reviewCount); // Pour vérification
               })
               .catch(error => {
                   console.error('Erreur lors de la récupération du nombre de reviews :', error);
               });
       }
   }, [product.ProductID]);


    const handleViewReviews = () => {
        navigation.navigate('ViewReview', { productId: productID }); // Assurez-vous que 'ReviewsScreen' est le nom correct de votre écran
    };

    const handleAddReview = () => {
        navigation.navigate('AddReview', { productId: productID }); // Assurez-vous que 'AddReviewScreen' est le nom correct de votre écran
    };

    const recordProductView = (userID, productID) => {
      const viewedDate = new Date().toISOString();
      const db = getDB();

      if (!db) {
        console.error('Erreur: La base de données n\'est pas initialisée');
        return;
      }

      db.transaction(tx => {
        // Vérifier d'abord si l'entrée existe
        tx.executeSql(
          'SELECT * FROM ProductHistory WHERE UserID = ? AND ProductID = ?',
          [userID, productID],
          (tx, results) => {
            if (results.rows.length === 0) {
              // Si aucune entrée n'existe, procéder à l'insertion
              tx.executeSql(
                'INSERT INTO ProductHistory (UserID, ProductID, ViewedDate) VALUES (?, ?, ?)',
                [userID, productID, viewedDate],
                () => {
                  console.log('Historique de consultation enregistré');
                },
                error => {
                  console.error('Erreur lors de l\'insertion de l\'historique de consultation :', error);
                }
              );
            } else {
              console.log('Entrée existante trouvée, insertion ignorée');
            }
          },
          error => {
            console.error('Erreur lors de la vérification de l\'historique :', error);
          }
        );
      });
    };

    const toggleFavorite = () => {
        if (isFavorite) {
            removeFromFavorites(user.id, product.ProductID);
        } else {
            addToFavorites(user.id, product.ProductID);
        }
        setIsFavorite(!isFavorite);
    };

    const productImage = product && product.ImageURL ? imageMap[product.ImageURL] : null;

    if (!product) {
            return <View><Text>{translations['ProductDetailsScreen']?.['productNotFound'] ?? 'Product Not Found'}</Text></View>;
    }

return (
        <BaseLayout navigation={navigation}>
            <ScrollView style={theme.ProductScreenContainer}>
                <View style={theme.ProductScreenHeaderContainer}>
                    <Text style={theme.ProductScreenProductName}>{product.ProductName}</Text>
                    <TouchableOpacity onPress={toggleFavorite}>
                        <Image
                            source={isFavorite ? require('./assets/red-heart.png') : require('./assets/white-heart.png')}
                            style={theme.ProductScreenHeartIcon}
                        />
                    </TouchableOpacity>
                </View>
                {productImage && (
                    <Image source={productImage} style={theme.ProductScreenProductImage} />
                )}
                <View style={theme.ProductScreenDetailsContainer}>
                    <Text style={theme.ProductScreenPrice}>{translations['ProductDetailsScreen']?.['priceLabel'] ?? 'Price'}: ${product.Price}</Text>
                    <Text style={theme.ProductScreenScore}>{translations['ProductDetailsScreen']?.['sustainabilityScore'] ?? 'Sustainability Score'}: {product.SustainabilityScoreID}/100</Text>
                    <Text style={theme.ProductScreenDescription}>{product.Description}</Text>
                    <TouchableOpacity style={theme.ProductScreenReviewButton} onPress={handleViewReviews}>
                        <Text style={theme.ProductScreenReviewButtonText}>{translations['ProductDetailsScreen']?.['viewReviews']} ({numberOfReviews})</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={theme.ProductScreenReviewButton} onPress={handleAddReview}>
                        <Text style={theme.ProductScreenReviewButtonText}>{translations['ProductDetailsScreen']?.['addReview'] ?? 'Add Review'}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={theme.ProductScreenAddButton} onPress={() => { /* Implémentation future */ }}>
                    <Text style={theme.ProductScreenAddButtonText}>{translations['ProductDetailsScreen']?.['visitBrandWebsite'] ?? 'Visit the brand website'}</Text>
                </TouchableOpacity>
            </ScrollView>
        </BaseLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5E7C5E',
        padding: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        flex: 1, // Utilisez flex pour permettre au titre de prendre l'espace disponible
        marginRight: 10, // Ajoutez une marge pour espacer le titre de l'icône
    },
    // Ajoutez un style pour l'icône si nécessaire
    heartIcon: {
        width: 24, // Définissez la taille souhaitée pour l'icône
        height: 24,
    },
    productImage: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    detailsContainer: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#5E7C5E',
        marginBottom: 10,
    },
    score: {
        fontSize: 16,
        color: 'green',
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: 'black',
    },
    addButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
     reviewButton: {
        backgroundColor: '#5E7C5E',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    reviewButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default ProductDetailsScreen;
