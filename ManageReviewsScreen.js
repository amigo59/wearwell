import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import BaseLayout from './BaseLayout';
import { useLanguage } from './LanguageContext';
import { AuthContext } from './AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Rating } from 'react-native-ratings';
import imageMap from './imageMap';
import { selectDatabaseFunctions } from './DBSelection';
import { ThemeProvider, ThemeContext } from './ThemeContext';
import { defaultTheme, darkTheme, lightTheme} from './Theme';

const ManageReviews = ({ route }) => {
    const { user } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const [hasReviews, setHasReviews] = useState(false);
    const navigation = useNavigation();
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [updatedRating, setUpdatedRating] = useState(0);
    const [updatedReviewText, setUpdatedReviewText] = useState('');
    const { translations } = useLanguage();
    const { themeMode } = useContext(ThemeContext);
    const theme = themeMode === 'dark' ? darkTheme : (themeMode === 'light' ? lightTheme : defaultTheme);

    useEffect(() => {
        const fetchData = async () => {
            const DB = await selectDatabaseFunctions();
            if (user?.id) {
                try {
                    const reviewsData = await DB.fetchReviewsAllProductsForUser(user.id);
                    setReviews(reviewsData);
                    setHasReviews(reviewsData.length > 0);
                } catch (error) {
                    console.error('Error fetching reviews:', error);
                }
            }
        };

        fetchData();
    }, [user.id]);

    const handleRatingCompleted = (rating) => {
        setUpdatedRating(rating);
    };

     const startEditingReview = (reviewId, currentRating, currentReviewText) => {
         setEditingReviewId(reviewId);
         setUpdatedRating(currentRating); // Initialise avec la note actuelle
         setUpdatedReviewText(currentReviewText); // Initialise avec le texte actuel
     };

     const cancelEditingReview = () => {
         setEditingReviewId(null);
         setUpdatedRating(0); // Réinitialise la note
         setUpdatedReviewText(''); // Réinitialise le texte
     };

     const confirmDelete = (reviewId) => {
         Alert.alert(
             translations['ManageReviewsScreen']['confirmDeletion'], // Titre traduit
             translations['ManageReviewsScreen']['deleteReviewConfirmation'], // Message traduit
             [
                 {
                     text: translations['ManageReviewsScreen']['noButton'], // Bouton "Non" traduit
                     style: "cancel"
                 },
                 {
                     text: translations['ManageReviewsScreen']['yesButton'], // Bouton "Oui" traduit
                     onPress: () => deleteReviewItem(reviewId)
                 }
             ],
             { cancelable: true }
         );
     };

     const saveUpdatedReview = async (reviewId) => {
         const DB = await selectDatabaseFunctions();
         try {
             await DB.updateReview(reviewId, updatedRating, updatedReviewText); // Utilisez updateReview depuis DB
             setEditingReviewId(null);
             // Recharger les avis et mettre à jour l'état
             const reviewsData = await DB.fetchReviewsAllProductsForUser(user.id); // Utilisez fetchReviewsAllProductsForUser depuis DB
             setReviews(reviewsData);
             setHasReviews(reviewsData.length > 0);
         } catch (error) {
             console.error('Erreur lors de la mise à jour de l\'avis:', error);
         }
     };



    const deleteReviewItem = async (reviewId) => {
        const DB = await selectDatabaseFunctions();
        try {
            await DB.deleteReview(reviewId); // Utilisez deleteReview depuis DB
            const reviewsData = await DB.fetchReviewsAllProductsForUser(user.id); // Utilisez fetchReviewsAllProductsForUser depuis DB
            setReviews(reviewsData);
            setHasReviews(reviewsData.length > 0);
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'avis:', error);
        }
    };


    return (
        <BaseLayout navigation={navigation}>
            <ScrollView style={theme.ManageReviewsContainer}>
                {hasReviews ? (
                    reviews.map((review, index) => {
                        const productImage = imageMap[review.ImageURL];
                        const formattedDate = review.ReviewDate.substring(0, 10);
                        return (
                            <View key={index} style={theme.ManageReviewsReviewItem}>
                                {editingReviewId === review.ReviewID ? (
                                    <View>
                                        <Text>{translations['ManageReviewsScreen']?.['editReviewTitle']}</Text>
                                        <View style={theme.ManageReviewsImageTitleContainer}>
                                            <Image source={productImage} style={theme.ManageReviewsProductImage} />
                                            <Text style={theme.ManageReviewsProductTitle}>{review.ProductName}</Text>
                                        </View>
                                        <Text style={theme.ManageReviewsReviewDate}>{formattedDate}</Text>
                                        <Rating
                                            startingValue={updatedRating} // Utiliser updatedRating comme valeur initiale
                                            onFinishRating={handleRatingCompleted} // Gérer la fin de la sélection
                                            imageSize={20}
                                        />
                                        <TextInput
                                            style={theme.ManageReviewsInput}
                                            value={updatedReviewText}
                                            onChangeText={setUpdatedReviewText}
                                            multiline
                                        />
                                        <View style={theme.ManageReviewsIconsContainer}>
                                            <TouchableOpacity onPress={() => saveUpdatedReview(review.ReviewID)}>
                                                <Image source={require('./assets/save.png')} style={theme.ManageReviewsIcon} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={cancelEditingReview}>
                                                <Image source={require('./assets/cancel.png')} style={theme.ManageReviewsIcon} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ) : (
                                    // Bloc pour l'affichage normal de l'avis
                                    <View>
                                        <View style={theme.ManageReviewsImageTitleContainer}>
                                            <Image source={productImage} style={theme.ManageReviewsProductImage} />
                                            <Text style={theme.ManageReviewsProductTitle}>{review.ProductName}</Text>
                                            <Text style={theme.ManageReviewsReviewDate}>{formattedDate}</Text>
                                        </View>
                                        <View>
                                        </View>
                                        <Rating
                                            readonly
                                            startingValue={review.Rating}
                                            imageSize={20}
                                        />

                                        <Text>{review.ReviewText}</Text>

                                        <View style={theme.ManageReviewsIconsContainer}>
                                            <TouchableOpacity onPress={() => startEditingReview(review.ReviewID, review.Rating, review.ReviewText)}>
                                                <Image source={require('./assets/update.png')} style={theme.ManageReviewsIcon} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => confirmDelete(review.ReviewID)}>
                                                <Image source={require('./assets/delete.png')} style={theme.ManageReviewsIcon} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                            </View>
                        );
                    })
                ) : (
                    <Text style={theme.ManageReviewsNoReviewsText}>No Reviews Yet.</Text>
                )}
            </ScrollView>
        </BaseLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5E7C5E',
    },
    reviewItem: {
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginBottom: 10,
    },
   imageTitleContainer: {
       alignItems: 'center', // Centrer les éléments horizontalement
   },
   productImage: {
       width: 50,
       height: 50,
       resizeMode: 'contain',
   },
   productTitle: {
       fontSize: 10,
       fontWeight: 'bold',
       textAlign: 'center', // Centrer le texte
   },
   reviewDate: {
       fontSize: 8,
       fontStyle: 'italic',
   },
   iconsContainer: {
       flexDirection: 'row',
       justifyContent: 'flex-end', // Aligner les icônes à droite
       marginTop: 5,
   },
   icon: {
       width: 15,
       height: 15,
       marginLeft: 10, // Espacement entre les icônes
   },
   noReviewsText: {
       textAlign: 'center',
       marginTop: 20,
   },
    // Ajoutez d'autres styles si nécessaire
});

export default ManageReviews;
