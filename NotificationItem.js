// NotificationItem.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const NotificationItem = ({ notification, onPress, markNotificationAsRead }) => {
  // Vérifie si la notification est lue pour ajuster le style
  const isRead = notification.readstatus === 1;

  // Appelée lorsque l'utilisateur touche la notification
  const handlePress = () => {
    // Si la notification n'est pas encore marquée comme lue, faites-le
    if (!isRead) {
      markNotificationAsRead(notification.notificationid);
    }
    // Gérez toute autre logique de pression, comme la navigation
    onPress && onPress(notification);
  };

  return (
    <TouchableOpacity style={[styles.container, isRead ? styles.read : styles.unread]} onPress={handlePress}>
      {isRead || <View style={styles.unreadIndicator} />}
      <Text style={styles.text}>{notification.details}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#DDD',
  },
  unread: {
    backgroundColor: '#F0F0F0', // ou toute autre couleur pour les notifications non lues
  },
  read: {
    backgroundColor: '#FFFFFF', // ou toute autre couleur pour les notifications lues
  },
  text: {
    flex: 1,
    marginLeft: 12,
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30', // ou toute autre couleur pour indiquer une notification non lue
  },
});

export default NotificationItem;
