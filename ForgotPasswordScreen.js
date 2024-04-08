//ForgotPasswordScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const isValidEmail = email => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleResetPassword = () => {
        if (!isValidEmail(email)) {
                Alert.alert("Invalid Email", "Please enter a valid email address.");
                return;
            }

        // Si l'email est valide, continuez avec la logique de réinitialisation du mot de passe
        Alert.alert("Reset Password", "Instructions to reset password have been sent to your email.");
        // Ici, ajoutez votre logique pour gérer la réinitialisation du mot de passe
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Reset Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor="#5E7C5E" />

                <TouchableOpacity onPress={handleResetPassword} style={styles.button}>
                    <Text style={styles.buttonText}>Send Instructions</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.linkText}>Back to Login</Text>
                </TouchableOpacity>
            </View>
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
    card: {
        backgroundColor: 'white',
        padding: 20,
        width: '80%',
        borderRadius: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        color: '#5E7C5E',
        fontWeight: 'bold',
        marginBottom: 20
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#5E7C5E',
        padding: 10,
        marginVertical: 10,
        color: '#5E7C5E'
    },
    button: {
        backgroundColor: '#5E7C5E',
        padding: 10,
        width: '100%',
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    linkText: {
        color: '#5E7C5E',
        marginTop: 10,
        fontWeight: 'bold'
    }
});

export default ForgotPasswordScreen;
