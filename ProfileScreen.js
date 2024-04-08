import React, {useContext} from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BaseLayout from './BaseLayout';
import { useLanguage } from './LanguageContext'; // Assurez-vous que ce chemin est correct
import { ThemeProvider, ThemeContext } from './ThemeContext';
import { defaultTheme, darkTheme, lightTheme} from './Theme';

const ProfileScreen = ({ navigation }) => {
  const { translations } = useLanguage(); // Utilisez useLanguage pour accéder aux traductions
  const sections = translations['ProfileScreen']?.['sections'] ?? []; // Utilisez une liste vide comme valeur par défaut si les traductions ne sont pas disponibles
  const { changeTheme } = useContext(ThemeContext);
  const { themeMode } = useContext(ThemeContext);
  const theme = themeMode === 'dark' ? darkTheme : (themeMode === 'light' ? lightTheme : defaultTheme);

  const handlePress = (sectionId) => {
      switch (sectionId) {
          case 'personalInformation':
              navigation.navigate('ProfileEdit'); // Assurez-vous que c'est le nom correct du screen enregistré dans votre navigateur
              break;
          case 'reviews':
              navigation.navigate('ManageReviews'); // Assurez-vous que c'est le nom correct du screen enregistré dans votre navigateur
              break;
          case 'notifications':
              navigation.navigate('Notifications'); // Assurez-vous que c'est le nom correct du screen enregistré dans votre navigateur
              break;
          // Ajoutez ici la logique de navigation pour les autres sections si nécessaire
          default:
              console.log(`Navigating to ${sectionId}`);
              break;
      }
  };

  return (
    <BaseLayout navigation={navigation}>
      <ScrollView style={theme.ProfileScreenContainer}>
        {sections.map((section, index) => (
          <TouchableOpacity key={index} onPress={() => handlePress(section.id)}>
            <View style={theme.ProfileScreenSection}>
              <Text style={theme.ProfileScreenSectionTitle}>{section.title}</Text>
              <Text style={theme.ProfileScreenSectionContent}>{section.content}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </BaseLayout>
  );
};

export default ProfileScreen;
