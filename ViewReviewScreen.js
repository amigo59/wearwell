// ViewReviewScreen.js
import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
//import { fetchReviewsForProduct, fetchProductFromDatabaseById } from './databaseFunctions';
import { selectDatabaseFunctions } from './DBSelection';
import { Rating } from 'react-native-ratings';
import BaseLayout from './BaseLayout';
import { useNavigation } from '@react-navigation/native';
import imageMap from './imageMap'; // Assurez-vous que ce fichier existe et contient les mappages d'images
import { useLanguage } from './LanguageContext'; // Importez useLanguage

const ViewReviewsScreen = ({ route }) => {
    const navigation = useNavigation();
    const { translations } = useLanguage(); // Utilisez useLanguage pour accéder aux traductions
    const { productId } = route.params;
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [hasReviews, setHasReviews] = useState(false);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const DB = await selectDatabaseFunctions();
                if (DB && DB.fetchProductFromDatabaseById && DB.fetchReviewsForProduct) {
                    const productData = await DB.fetchProductFromDatabaseById(productId);
                    if (productData && JSON.stringify(product) !== JSON.stringify(productData)) {
                        setProduct(productData);
                    }

                    const fetchedReviews = await DB.fetchReviewsForProduct(productId);
                    if (fetchedReviews && fetchedReviews.length > 0) {
                        // Mise à jour conditionnelle basée sur le contenu réel des avis
                        if (JSON.stringify(reviews) !== JSON.stringify(fetchedReviews)) {
                            setReviews(fetchedReviews);
                        }

                        const totalRating = fetchedReviews.reduce((acc, review) => acc + parseFloat(review.Rating), 0);
                        const newAverage = totalRating / fetchedReviews.length;
                        if (averageRating !== newAverage) {
                            setAverageRating(newAverage);
                        }

                        if (!hasReviews) {
                            setHasReviews(true);
                        }
                    } else if (hasReviews) {
                        setHasReviews(false);
                    }
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des informations:", error);
            }
        };

        fetchData();
    }, [productId]); // Retirer les autres dépendances pour éviter le re-déclenchement inutile




    const productImage = product && product.ImageURL ? imageMap[product.ImageURL] : null;

    return (
        <BaseLayout navigation={navigation}>
            <ScrollView style={styles.container}>
                <View style={styles.productHeader}>
                    {productImage && (
                        <Image source={productImage} style={styles.productImage} />
                    )}
                    <Text style={styles.productName}>{product && product.ProductName}</Text>
                    <View style={styles.reviewSummary}>
                        <Rating
                            ratingCount={5}
                            readonly
                            startingValue={averageRating}
                            imageSize={30}
                        />
                    </View>
                    <View style={styles.reviewSummary}>
                        <Text style={styles.averageReviewsText}>
                            {translations['ViewReviewsScreen']?.['reviewsAverage'] || 'Reviews Average:'}
                        </Text>
                        <Text style={styles.averageRatingText}>{averageRating.toFixed(1)}/5</Text>
                    </View>
                </View>

                {hasReviews ? (
                    reviews.map((review, index) => {
                        return (
                            <View key={index} style={styles.reviewContainer}>
                                <View style={styles.reviewHeader}>
                                    <Text style={styles.reviewName}>{review.Name}</Text>
                                    <Rating
                                        readonly
                                        startingValue={review.Rating}
                                        imageSize={20}
                                    />
                                </View>
                                <Text style={styles.reviewText}>{review.ReviewText}</Text>
                            </View>
                        );
                    })
                ) : (
                    <Text style={styles.noReviewsText}>
                        {translations['ViewReviewsScreen']?.['noReviews'] || 'There are no reviews for this product yet.'}
                    </Text>
                )}
                <TouchableOpacity
                    style={styles.goBackButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.goBackButtonText}>Go Back</Text>
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
    productHeader: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    productImage: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
    },
    reviewSummary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    averageRatingText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
        color: "green"
    },
    averageReviewsText:{
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
        color: "grey"
    },
    reviewContainer: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    reviewName: {
        fontWeight: 'bold',
        color: '#5E7C5E',
        fontSize: 16,
    },
    reviewText: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
    },
    noReviewsText: {
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
        marginTop: 20,
    },
    goBackButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30, // Ajout d'un espace en bas
    },
    goBackButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ViewReviewsScreen;
