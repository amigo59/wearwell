//App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
//import './i18n'; // Assurez-vous que le chemin est correct
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import HomePage from './HomePage';
import ScanningItemScreen from './ScanningItemScreen';
import ItemScoreScreen from './ItemScoreScreen';
import ProfileScreen from './ProfileScreen'; // Assurez-vous que le chemin d'accès est correct
import FavoritesScreen from './FavoritesScreen';
import SettingsScreen from './SettingsScreen';
import CommunityScreen from './CommunityScreen';
import RecommendationsScreen from './RecommendationsScreen';
import ProductDetailsScreen from './ProductDetailsScreen';
import { AuthProvider } from './AuthContext';
import { useLanguage } from './LanguageContext'; // Importez la fonction useLanguage
import { LanguageProvider } from './LanguageContext'; // Importez votre LanguageProvider
import QRCodeScannerScreen from './QRCodeScannerScreen';
import ProfileEditScreen from './ProfileEditScreen';
import AddReviewScreen from './AddReviewScreen';
import LanguageChangeScreen from './LanguageChangeScreen'
import ViewReviewScreen from './ViewReviewScreen';
import ManageReviewsScreen from './ManageReviewsScreen';
import ChangePasswordScreen from './ChangePasswordScreen'
import ChangeThemeScreen from './ChangeThemeScreen';
import { initDB, createTables } from './db';
import { ThemeProvider } from './ThemeContext';
import ScannResultScreen from './ScannResultScreen';
import HeaderComponent from './HeaderComponent';
import NotificationsScreen from './NotificationsScreen';
import DisplayNotification from './DisplayNotification';


const Stack = createNativeStackNavigator();


const App = () => {

  useEffect(() => {
    initDB().then(() => {
      console.log("Database initialized");
      createTables();
    }).catch(error => {
      console.error("Error initializing database", error);
    });
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
          <AuthProvider>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                <Stack.Screen name="Home" component={HomePage} />
                <Stack.Screen name="ScanningItem" component={ScanningItemScreen} />
                <Stack.Screen name="ItemScore" component={ItemScoreScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Favorites" component={FavoritesScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen name="Community" component={CommunityScreen} />
                <Stack.Screen name="Recommendations" component={RecommendationsScreen} />
                <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
                <Stack.Screen name="QRCodeScanner" component={QRCodeScannerScreen} />
                <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
                <Stack.Screen name="AddReview" component={AddReviewScreen} />
                <Stack.Screen name="ViewReview" component={ViewReviewScreen} />
                <Stack.Screen name="ManageReviews" component={ManageReviewsScreen} />
                <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
                <Stack.Screen name="LanguageChange" component={LanguageChangeScreen} />
                <Stack.Screen name="ChangeTheme" component={ChangeThemeScreen} />
                <Stack.Screen name="ScannResult" component={ScannResultScreen} />
                <Stack.Screen name="HeaderComponent" component={HeaderComponent} />
                <Stack.Screen name="Notifications" component={NotificationsScreen} />
                <Stack.Screen name="DisplayNotification" component={DisplayNotification} />

              </Stack.Navigator>
            </NavigationContainer>
          </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>

  );
};

export default App;
