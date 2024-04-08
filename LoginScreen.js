//LoginScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { getDB } from './db';
import { AuthContext } from './AuthContext';
import { selectDatabaseFunctions } from './DBSelection';


const LoginScreen = ({ navigation }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = useContext(AuthContext);
    //const { t } = useTranslation();

    // LoginScreen.js

      const handleLogin = async () => {
        try {
          const DB = await selectDatabaseFunctions(); // Obtenez les fonctions de base de données correctes
          const user = await DB.authenticateUser(login, password);

          if (user) {
            signIn(user.userID); // Utilise l'userID de l'objet utilisateur
            console.log("Responseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee:",user);
            navigation.navigate('Home');
          } else {
            Alert.alert('Failed', 'Email or Password is incorrect');
          }
        } catch (error) {
          console.error('Login Error: ', error);
          Alert.alert('Login Error', error.toString());
        }
      };



    /*const handleLogin = () => {
        const db = getDB();
        if (!db) {
            console.error('Erreur: La base de données n\'est pas initialisée');
            return;
        }
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM Users WHERE Email = ? AND PasswordHash = ?',
                [login, password], // Assurez-vous que le mot de passe est hashé de la même manière qu'il est stocké
                (tx, results) => {
                    if (results.rows.length > 0) {
                        const user = results.rows.item(0);
                        signIn(user.UserID); // Utilisez l'ID réel de l'utilisateur
                        navigation.navigate('Home');
                    } else {
                        Alert.alert('Failed', 'Email or Password is incorrect');
                        console.error('Error', 'Email or Password is incorrect');
                    }
                },
                error => {
                    console.error('Error', error);
                }
            );
        });
    }*/

    return (
        <View style={styles.container}>
            <Image source={require('./assets/wearwell.png')} style={styles.logo} resizeMode="cover" />

            <View style={styles.loginContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Login"
                    value={login}
                    onChangeText={setLogin}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                    <Text style={styles.buttonText}>LOG IN</Text>
                </TouchableOpacity>

                <Text onPress={() => navigation.navigate('ForgotPassword')} style={styles.linkText}>FORGOT PASSWORD</Text>
                <Text onPress={() => navigation.navigate('SignUp')} style={styles.linkText}>SIGN UP</Text>
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
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20 // Ajoutez un espace entre le logo et la zone de connexion
    },
    loginContainer: {
        backgroundColor: 'white',
        padding: 20,
        width: '80%',
        borderRadius: 10,
        alignItems: 'center' // Centrer les éléments à l'intérieur du conteneur
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginVertical: 10,
        color: 'black',
        backgroundColor: 'white'
    },
    loginButton: {
        backgroundColor: '#5E7C5E',
        padding: 10,
        alignItems: 'center',
        width: '100%',
        marginTop: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 18
    },
    linkText: {
        color: '#5E7C5E',
        fontSize: 16,
        fontWeight: 'bold', // Texte en gras
        marginTop: 10
    }
});

export default LoginScreen;