import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';

const DisplayNotification = ({ navigation }) => {
  const route = useRoute();
  const { notification } = route.params;

  // Supposons que votre notification a un champ 'type' qui indique le type de la notification,
  // et que pour le type "NewProduct", vous avez un champ 'productId' qui vous permet de récupérer les détails du produit.

  const renderContent = () => {
    switch (notification.type) {
      case 'NewProduct':
        return (
          <View>
            <Text>New Product Available!</Text>
            <Text>Product ID: {notification.productId}</Text>
            {/* Vous pouvez ajouter ici un bouton ou un lien pour naviguer vers les détails du produit. */}
          </View>
        );

      case 'Event':
        return (
          <View>
            <Text>Event Notification</Text>
            <Text>{notification.details}</Text>
            {/* Afficher plus de détails sur l'événement ici. */}
          </View>
        );

      default:
        return (
          <View>
            <Text>Notification</Text>
            <Text>{notification.details}</Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      {renderContent()}
      <Button title="Back to Notifications" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DisplayNotification;
