// HeaderComponent.js
import React, { useState, useEffect, useContext } from 'react';
import { View, Modal, Image, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { AuthContext } from './AuthContext';
import NotificationItem from './NotificationItem'; // Assurez-vous d'importer NotificationItem
import Notifications from './NotificationsScreen'

const HeaderComponent = ({ navigation }) => {
  // Utiliser useContext pour accéder au contexte AuthContext
  const { user } = useContext(AuthContext);

  // S'assurer que currentUser est défini avant de tenter d'accéder à ses propriétés
  //const userId = currentUser ? currentUser.userId : null; // Assurez-vous que votre objet currentUser contient une propriété `userId`

  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  // Définir userId ici pour qu'il soit accessible dans toute la portée du composant
  const userId = user?.id; // Utiliser l'opérateur optionnel de chaînage ?. pour gérer le cas où user est undefined

  useEffect(() => {
    fetch(`http://192.168.1.21:3000/notifications/${userId}`)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          setNotifications(data);
          setNotificationCount(data.length);
        } catch (error) {
          console.error('La réponse n\'est pas en format JSON:', text);
          throw error; // Re-lancez l'erreur pour être capturée par le catch suivant
        }
      })
      .catch(error => console.error('Erreur lors de la récupération des notifications:', error));

  }, [user]); // Incluez userId ici pour recharger les notifications si userId change

  // Gère l'appui sur la notification
  const handleNotificationPress = () => {
    navigation.navigate('Notifications');
    setNotificationCount(0); // Réinitialisez le compteur de notifications
  };

  return (
    <View style={styles.headerContainer}>
      <Image
        source={require('./assets/wearwell-text.png')}
        style={styles.logoStyle}
      />
      <View style={styles.flexSpacer} />
      <TouchableOpacity
        style={styles.notificationButton}
        onPress={handleNotificationPress}
        activeOpacity={0.6}
      >
        {notificationCount > 0 && (
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>{notificationCount}</Text>
          </View>
        )}
        <Image
          source={require('./assets/notification.png')}
          style={styles.notificationIcon}
        />
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 40,
    backgroundColor: '#FFFFFF', // Un fond blanc ou choisissez une autre couleur qui correspond à votre thème
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 16,
    paddingLeft: 16,
    elevation: 4, // Ajoute une ombre sous l'en-tête pour Android
    shadowColor: '#000', // Ajoute une ombre sous l'en-tête pour iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logoStyle: {
    // Vous devrez ajuster ces mesures en fonction de la taille de votre logo
    width: 100, // Largeur du logo
    height: 40, // Hauteur du logo, à ajuster pour conserver les proportions
    resizeMode: 'contain', // Assure que le logo est redimensionné correctement
  },
  flexSpacer: {
    flex: 1, // Ajoute un espace flexible entre le logo et le bouton de notification
  },
  notificationButton: {
    // Styles pour le bouton de notification
    padding: 10, // Espace autour de l'icône pour faciliter le toucher
  },
  notificationIcon: {
    width: 24,
    height: 24,
  },
  notificationBadge: {
    position: 'absolute',
    right: -10, // Ajustez selon la position désirée
    top: -3, // Ajustez selon la position désirée
    backgroundColor: 'red',
    borderRadius: 12, // Augmentez si nécessaire pour garder la forme circulaire
    minWidth: 24, // Assurez-vous que le badge s'adapte au contenu
    height: 24, // Augmentez si nécessaire pour le contenu à deux chiffres
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6, // Ajoutez un padding horizontal pour le contenu à deux chiffres
    zIndex: 10,
  },
  badgeText: {
    color: 'white',
    fontSize: 10, // Réduisez la taille si nécessaire pour le contenu à deux chiffres
    fontWeight: 'bold',
  },

  notificationText: {
    marginBottom: 15,
    textAlign: "center"
  },


});

export default HeaderComponent;
