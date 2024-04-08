// BaseLayout.js
import React from 'react';
import { View } from 'react-native';
import MenuComponent from './MenuComponent';
import HeaderComponent from './HeaderComponent'; // Assurez-vous que le chemin d'accès est correct

const BaseLayout = ({ children, navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent navigation={navigation} />
      {children}
      <MenuComponent navigation={navigation} />
    </View>
  );
};

export default BaseLayout;
