// MenuComponent.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useLanguage } from './LanguageContext'; // Assurez-vous que le chemin est correct

const MenuComponent = ({ navigation }) => {
  const { translations } = useLanguage(); // Utilisez useLanguage pour accéder aux traductions
  const menuTranslations = translations['MenuComponent'];

  return (
    <View style={styles.menu}>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
        <Image source={require('./assets/home-icon.png')} style={styles.menuIcon} />
        <Text style={styles.menuText} numberOfLines={1} ellipsizeMode="tail">{menuTranslations['home']}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Community')}>
        <Image source={require('./assets/community-icon.png')} style={styles.menuIcon} />
        <Text style={styles.menuText} numberOfLines={1} ellipsizeMode="tail">{menuTranslations['community']}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Favorites')}>
        <Image source={require('./assets/favourites-icon.png')} style={styles.menuIcon} />
        <Text style={styles.menuText} numberOfLines={1} ellipsizeMode="tail">{menuTranslations['favorites']}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
        <Image source={require('./assets/settings-icon.png')} style={styles.menuIcon} />
        <Text style={styles.menuText} numberOfLines={1} ellipsizeMode="tail">{menuTranslations['settings']}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Profile')}>
        <Image source={require('./assets/profile-icon.png')} style={styles.menuIcon} />
       <Text style={styles.menuText} numberOfLines={1} ellipsizeMode="tail">{menuTranslations['profile']}</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
  },
  menuItem: {
    flex: 1,
    alignItems: 'center', // Centrer horizontalement
    justifyContent: 'center', // Centrer verticalement
    marginHorizontal: 5, // Ajouter un peu d'espace horizontal entre les éléments
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginBottom: 5, // Espacer l'icône du texte
  },
  menuText: {
    fontSize: 9, // Ajuster selon les besoins
    textAlign: 'center', // Centrer le texte horizontalement
    flexWrap: 'wrap', // Permettre au texte de passer à la ligne si nécessaire
    color: 'black'
  },
});


export default MenuComponent;
