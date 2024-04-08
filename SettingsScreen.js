//SettingsScreen.js
import React, { useContext }  from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BaseLayout from './BaseLayout';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from './LanguageContext'; // Assurez-vous que ce chemin est correct
import { ThemeProvider, ThemeContext } from './ThemeContext';
import { defaultTheme, darkTheme, lightTheme} from './Theme';

const SettingsScreen = ({ navigation }) => {
  const { translations } = useLanguage(); // Utilisez useLanguage pour accéder aux traductions
  const sections = translations['SettingScreen']?.['sections'] ?? []; // Utilisez une liste vide comme valeur par défaut
  const { changeTheme } = useContext(ThemeContext);
  const { themeMode } = useContext(ThemeContext);
  const theme = themeMode === 'dark' ? darkTheme : (themeMode === 'light' ? lightTheme : defaultTheme);

  const handleSectionPress = (sectionId) => {
      console.log(translations['SettingScreen']);

      switch (sectionId) {
          case 'changePassword':
              navigation.navigate('ChangePassword');
              break;
          case 'changeLanguage':
              navigation.navigate('LanguageChange');
              break;
          case 'mode':
              navigation.navigate('ChangeTheme');
              break;
          default:
              console.log(`Aucune action trouvée pour l'identifiant: ${sectionId}`);
              break;
      }
  };



  const handleLogoutPress = () => {
    navigation.navigate('Login');
  };

  return (
          <BaseLayout navigation={navigation}>
              <ScrollView style={theme.settingsScreenContainer}>
                  {sections.map((section, index) => (
                      <TouchableOpacity key={index} onPress={() => handleSectionPress(section.id)}>
                          <View style={theme.settingsScreenSection}>
                              <Text style={theme.settingsScreenSectionTitle}>{section.title}</Text>
                              <Text style={theme.settingsScreenSectionContent}>{section.content}</Text>
                          </View>
                      </TouchableOpacity>
                  ))}

                  <TouchableOpacity onPress={handleLogoutPress}>
                      <View style={theme.settingsScreenLogoutButton}>
                          <Text style={theme.settingsScreenLogoutButtonText}>{translations['SettingScreen']?.['logoutButton'] ?? 'Log Out'}</Text>
                      </View>
                  </TouchableOpacity>
              </ScrollView>
          </BaseLayout>
      );
  };

  export default SettingsScreen;
