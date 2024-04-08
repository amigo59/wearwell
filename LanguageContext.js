//LanguageContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './translation/en.js'; // Importe les traductions anglaises
import fr from './translation/fr.js'; // Importe les traductions françaises
import ar from './translation/ar.js'; // Importe les traductions arabes
import de from './translation/de.js';
import it from './translation/it.js';
import nl from './translation/nl.js';
import es from './translation/es.js';
import pt from './translation/pt.js';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');
    const [translations, setTranslations] = useState(en);
    const [userId, setUserId] = useState(null); // Vous devez définir cet ID lors de la connexion de l'utilisateur

    useEffect(() => {
        // Appelé lors du chargement de l'application pour charger la langue préférée
        const loadLanguagePreference = async () => {
            if (userId) {
                const storedLang = await AsyncStorage.getItem(`language_preference_${userId}`);
                if (storedLang) {
                    switchLanguage(storedLang);
                }
            }
        };

        loadLanguagePreference();
    }, [userId]);

    const switchLanguage = async (lang) => {
        setLanguage(lang);
        let newTranslations;
        switch (lang) {
            case 'en':
                newTranslations = en;
                break;
            case 'fr':
                newTranslations = fr;
                break;
            case 'ar':
                newTranslations = ar;
                break;
            case 'es':
                newTranslations = es;
                break;
            case 'it':
                newTranslations = it;
                break;
            case 'de':
                newTranslations = de;
                break;
            case 'nl':
                newTranslations = nl;
                break;
            case 'pt':
                newTranslations = pt;
                break;
            default:
                newTranslations = en;
        }
        setTranslations(newTranslations);

                // Enregistrer la préférence de langue dans le stockage local pour l'utilisateur actuel
                if (userId) {
                    await AsyncStorage.setItem(`language_preference_${userId}`, lang);
                }
            };

            const loadLanguagePreference = async () => {
                if (userId) {
                    try {
                        const storedLang = await AsyncStorage.getItem(`language_preference_${userId}`);
                        if (storedLang) {
                            switchLanguage(storedLang);
                        }
                    } catch (error) {
                        console.error('Erreur lors du chargement de la préférence de langue', error);
                    }
                }
            };

            return (
                <LanguageContext.Provider value={{ language, translations, switchLanguage }}>
                    {children}
                </LanguageContext.Provider>
            );
        };

        export const useLanguage = () => useContext(LanguageContext);