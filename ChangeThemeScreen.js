import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from './ThemeContext'; // Importez seulement ThemeContext
import { defaultTheme, lightTheme, darkTheme } from './Theme'; // Assurez-vous que le chemin est correct
import BaseLayout from './BaseLayout';
import { useLanguage } from './LanguageContext';
import { useNavigation } from '@react-navigation/native';

const ChangeTheme = () => {
    const { changeTheme } = useContext(ThemeContext); // Utilisez changeTheme de ThemeContext
    const { translations } = useLanguage();
    const navigation = useNavigation();

    console.log('Translations :', translations['ThemeScreen']?.['defaultTheme']);

    const getButtonStyle = (theme) => ({
        backgroundColor: theme.backgroundColor,
        padding: 15,
        marginVertical: 10,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
    });

    const changeThemeAction = (mode) => {
        console.log("Changing theme to:", mode); // Ajoutez un log pour déboguer
        changeTheme(mode); // Utilisez changeTheme de votre ThemeContext
        console.log("Navigating back to Settings"); // Log de débogage
        navigation.navigate('Settings'); // Naviguez explicitement vers SettingsScreen
    };

     return (
         <BaseLayout navigation={navigation}>
             <View style={styles.container}>
                 <View style={styles.formContainer}>
                     <TouchableOpacity
                         style={getButtonStyle(defaultTheme)}
                         onPress={() => changeThemeAction('default')}>
                         <Text style={styles.buttonText}>{translations['ThemeScreen']?.['defaultTheme']}</Text>
                     </TouchableOpacity>

                     <TouchableOpacity
                         style={getButtonStyle(lightTheme)}
                         onPress={() => changeThemeAction('light')}>
                         <Text style={styles.buttonTextLight}>{translations['ThemeScreen']?.['lightTheme']}</Text>
                     </TouchableOpacity>

                     <TouchableOpacity
                         style={getButtonStyle(darkTheme)}
                         onPress={() => changeThemeAction('dark')}>
                         <Text style={styles.buttonText}>{translations['ThemeScreen']?.['darkTheme']}</Text>
                     </TouchableOpacity>
                 </View>
             </View>
         </BaseLayout>
     );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5E7C5E',
    },
    formContainer: {
        backgroundColor: 'white',
        padding: 20,
        width: '80%',
        borderRadius: 10,
        alignItems: 'center' // Centrer les éléments à l'intérieur du conteneur
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
     buttonTextLight: {
        color: 'grey',
        fontSize: 16,
        fontWeight: 'bold',
    },
    // Vous pouvez supprimer le style themeButton si vous n'en avez plus besoin
});

export default ChangeTheme;