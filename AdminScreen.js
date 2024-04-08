import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AdminScreen = ({ navigation }) => {
    const handleAddUser = () => {
        // Redirige vers la page d'ajout d'utilisateur
        navigation.navigate('AddUser');
    };

    const handleAddProduct = () => {
        // Redirige vers la page d'ajout de produit
        navigation.navigate('AddProduct');
    };

    const handleAddBrand = () => {
        // Redirige vers la page d'ajout de marque
        navigation.navigate('AddBrand');
    };

    const handleAddCategory = () => {
        // Redirige vers la page d'ajout de catégorie
        navigation.navigate('AddCategory');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Admin Panel</Text>
            <View style={styles.linksContainer}>
                <TouchableOpacity style={styles.link} onPress={handleAddUser}>
                    <Text style={styles.linkText}>Add User</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.link} onPress={handleAddProduct}>
                    <Text style={styles.linkText}>Add Product</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.link} onPress={handleAddBrand}>
                    <Text style={styles.linkText}>Add Brand</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.link} onPress={handleAddCategory}>
                    <Text style={styles.linkText}>Add Category</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5E7C5E', // Couleur de fond de l'application
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    linksContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    link: {
        marginVertical: 10,
    },
    linkText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#5E7C5E', // Couleur de texte principale de l'application
    },
});

export default AdminScreen;
