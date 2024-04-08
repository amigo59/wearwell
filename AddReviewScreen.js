// AddReviewScreen.js
import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Image, ScrollView, TouchableOpacity } from 'react-native';
import { AuthContext } from './AuthContext';
import BaseLayout from './BaseLayout';
//import { addReviewToDatabase, fetchProductFromDatabaseById } from './databaseFunctions'; // Assurez-vous que cette fonction est bien définie
import imageMap from './imageMap'; // Assurez-vous que ce fichier existe et contient les mappages d'images
import StarRating from 'react-native-star-rating';
import { Rating } from 'react-native-ratings';
import { useNavigation } from '@react-navigation/native';
import { selectDatabaseFunctions } from './DBSelection';

const AddReviewScreen = ({ route }) => {
    const { productId } = route.params;
    const { user } = useContext(AuthContext);
    const navigation = useNavigation();
    const [product, setProduct] = useState(null);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const DB = await selectDatabaseFunctions();
                if (DB && DB.fetchProductFromDatabaseById) {
                    DB.fetchProductFromDatabaseById(productId).then(productData => {
                        if (productData) {
                            setProduct(productData);
                            console.log('Produit chargé:', productData);
                        } else {
                            console.error("Produit non trouvé pour l'ID:", productId);
                        }
                    });
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des détails du produit: ", error);
            }
        };

        if (productId) {
            fetchProductDetails();
        }
    }, [productId]);

    const productImage = product && product.ImageURL ? imageMap[product.ImageURL] : null;
    useEffect(() => {
        if (product) {
            console.log('URL de l\'image du produit:', product.ImageURL);
        }
    }, [product]);

    const submitReview = async () => {
        // Vérification de la note...

        try {
            const DB = await selectDatabaseFunctions();
            if (DB && DB.addReviewToDatabase) {
                await DB.addReviewToDatabase(user.id, productId, rating, reviewText);
                console.log('Review submission successful');
                navigation.goBack();
            } else {
                console.error("addReviewToDatabase function not found");
            }
        } catch (error) {
            console.error('Review submission failed:', error);
        }
    };

    return (
        <BaseLayout navigation={navigation}>
            <ScrollView style={styles.container}>
                <Text style={styles.productName}>{product?.ProductName}</Text>
                {productImage && (
                    <Image source={productImage} style={styles.productImage} />
                )}

                <View style={styles.formContainer}>
                    <Text style={styles.label}>Rating:</Text>
                    <Rating

                        ratingCount={5}
                        imageSize={40}
                        showRating
                        onFinishRating={(rating) => setRating(rating)}
                    />

                    <Text style={styles.label}>Your Review:</Text>
                    <TextInput
                        style={styles.input}
                        value={reviewText}
                        onChangeText={setReviewText}
                        multiline
                    />

                   <TouchableOpacity style={styles.submitButton} onPress={submitReview}>
                       <Text style={styles.submitButtonText}>Submit Review</Text>
                   </TouchableOpacity>
                </View>
            </ScrollView>
        </BaseLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5E7C5E',
    },
    formContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        margin: 10,
    },
    productImage: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center', // Centrer le texte horizontalement
        width: '100%', // Assurez-vous que le conteneur du texte prend toute la largeur
        marginBottom: 10, // Ajoutez une marge en bas si nécessaire
    },
    label: {
        marginTop: 10,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginBottom: 10,
    },
    submitButton: {
        backgroundColor: '#5E7C5E', // Même couleur que le fond
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});


export default AddReviewScreen;
