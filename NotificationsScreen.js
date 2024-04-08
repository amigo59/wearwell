// NotificationsScreen.js
import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import BaseLayout from './BaseLayout';
import { AuthContext } from './AuthContext';
import NotificationItem from './NotificationItem'; // Assurez-vous que c'est le bon chemin

const apiUrl = 'http://192.168.1.21:3000';

const NotificationsScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const userId = user?.id;
      try {
        const response = await fetch(`${apiUrl}/notifications/${userId}`);
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des notifications:', error);
      }
    };

    fetchNotifications();
  }, [user]);

  const markNotificationAsRead = (notificationId) => {
    fetch(`${apiUrl}/notifications/markAsRead/${notificationId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      // Mise à jour de l'état local pour refléter le changement dans l'interface utilisateur
      setNotifications(currentNotifications =>
        currentNotifications.map(notification =>
          notification.notificationid === notificationId ? { ...notification, readstatus: 1 } : notification
        )
      );
    })
    .catch(error => console.error('Failed to mark notification as read', error));
  };

  const fetchProductAndNavigate = async (productId) => {
    try {
      const response = await fetch(`${apiUrl}/products/${productId}`);
      const productData = await response.json();
      if (productData) {
        navigation.navigate('ProductDetails', { product: productData });
        console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX Produit appelé:',productData);
      } else {
        console.error('Produit non trouvé');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des détails du produit:', error);
    }
  };


  return (
    <BaseLayout navigation={navigation}>
      <View style={styles.container}>
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.notificationid.toString()}
          renderItem={({ item }) => (
            <NotificationItem
              notification={item}
              onPress={() => {
                if (item.type === 'NewProduct' && item.productid) {
                  // Utilisez la fonction fetchProductAndNavigate avec l'ID du produit
                  fetchProductAndNavigate(item.productid);
                } else {
                  // Pour les autres types de notifications, vous pouvez gérer différemment
                  // Par exemple, naviguer vers une autre page ou afficher un message
                }
              }}
              markNotificationAsRead={markNotificationAsRead}
            />
          )}
        />

      </View>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#5E7C5E' },
});

export default NotificationsScreen;
