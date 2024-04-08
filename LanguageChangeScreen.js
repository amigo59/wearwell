//LanguageChangeScreen.js
import React, {useContext} from 'react';
import { ScrollView, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import BaseLayout from './BaseLayout';
import { useLanguage } from './LanguageContext';
import { ThemeContext } from './ThemeContext'; // Ajustez le chemin selon votre projet
import { defaultTheme, darkTheme, lightTheme} from './Theme';

// Import des drapeaux
import ukFlag from './assets/uk.png';
import franceFlag from './assets/fr.png';
import spainFlag from './assets/es.png';
import germanyFlag from './assets/de.png';
import moroccoFlag from './assets/ma.png';
import italyFlag from './assets/it.png';
import hollandFlag from './assets/nl.png';
import portugalFlag from './assets/pt.png';

const LanguageChangeScreen = ({ navigation }) => {
    const { switchLanguage } = useLanguage(); // Utilisez la fonction switchLanguage de LanguageContext
    const { translations } = useLanguage(); // Utilisez useLanguage pour accéder aux traductions
    const { themeMode } = useContext(ThemeContext); // Utiliser useContext pour accéder au mode de thème actuel
    const theme = themeMode === 'dark' ? darkTheme : (themeMode === 'light' ? lightTheme : defaultTheme);
    const handleLanguageChange = (langCode) => {
        switchLanguage(langCode); // Utilisez directement switchLanguage de LanguageContext
        navigation.navigate('Home'); // Navigue vers HomePage après le changement de langue
    };

    const languages = [
        { code: 'en', name: 'English', flag: ukFlag },
        { code: 'fr', name: 'Français', flag: franceFlag },
        { code: 'es', name: 'Español', flag: spainFlag },
        { code: 'de', name: 'Deutsch', flag: germanyFlag },
        { code: 'ar', name: 'العربية', flag: moroccoFlag },
        { code: 'it', name: 'Italiano', flag: italyFlag },
        { code: 'nl', name: 'Dutch', flag: hollandFlag },
        { code: 'pt', name: 'Portuguese', flag: portugalFlag },
    ];

    return (
        <BaseLayout navigation={navigation}>
            <ScrollView style={theme.LanguageChangeScreencontainer}>
                {languages.map((lang) => (
                    <TouchableOpacity key={lang.code} style={theme.LanguageChangeScreenlanguageButton} onPress={() => handleLanguageChange(lang.code)}>
                        <Image source={lang.flag} style={theme.LanguageChangeScreenflag} resizeMode="contain" />
                        <Text style={theme.LanguageChangeScreenlanguageText}>{lang.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </BaseLayout>
    );
};


export default LanguageChangeScreen;
