import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Button, Dimensions, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { fetchScannedProducts,fetchMaterialsInfo } from './databaseFunctions'; // Ajustez le chemin selon votre projet
import BaseLayout from './BaseLayout';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from './LanguageContext'; // Ajustez le chemin selon votre projet
import { ThemeContext } from './ThemeContext'; // Ajustez le chemin selon votre projet
import { defaultTheme, darkTheme, lightTheme} from './Theme';

const getCategoryAndGradient = (score) => {
  if (score >= 90) {
    return { category: 'A', colors: ['#006400', '#008000'] }; // Vert foncé à vert
  } else if (score >= 75) {
    return { category: 'B', colors: ['#008000', '#ADFF2F'] }; // Vert à vert clair
  } else if (score >= 65) {
    return { category: 'C', colors: ['#FFD700', '#FFA500'] }; // Jaune à orange clair
  } else if (score >= 55) {
    return { category: 'D', colors: ['#FFA500', '#FF4500'] }; // Orange clair à orange foncé
  } else {
    return { category: 'E', colors: ['#FF4500', '#FF0000'] }; // Orange foncé à rouge
  }
};

const ScannResultScreen = ({ navigation }) => {
  const [product, setProduct] = useState(null);
  const [materialsInfo, setMaterialsInfo] = useState([]);

  const { translations } = useLanguage(); // Utilisez useLanguage pour accéder aux traductions
  const { themeMode } = useContext(ThemeContext); // Utiliser useContext pour accéder au mode de thème actuel
  const theme = themeMode === 'dark' ? darkTheme : (themeMode === 'light' ? lightTheme : defaultTheme);

  useEffect(() => {
      fetchScannedProducts()
        .then((products) => {
          const randomProduct = products[Math.floor(Math.random() * products.length)];
          setProduct(randomProduct);
          if (randomProduct) {
          fetchMaterialsInfo(randomProduct.MaterialsIds).then(materialsInfo => {
            setMaterialsInfo(materialsInfo);
           });
          }
        })
        .catch((error) => {
          console.error('Error fetching scanned products or materials:', error);
        });
   }, []);

  if (!product) {
    return (
      <BaseLayout navigation={navigation}>
        <View style={theme.ScannResultcontainer}>
          <Text>{translations.ScannResultScreen.loading || 'Loading product data...'}</Text>
        </View>
      </BaseLayout>
    );
  }

  const { category, colors } = getCategoryAndGradient(product.EstimatedSustainabilityScore);

  return (
    <BaseLayout navigation={navigation} style={theme.ScannResultfullScreen}>
      <View style={theme.ScannResultcontainer}>
        <View style={theme.ScannResultresultContainer}>
          <View style={[theme.ScannResultdiamond, { backgroundColor: colors[0] }]}>
            <Text style={theme.ScannResultdiamondText}>{category}</Text>
          </View>
          <Text style={theme.ScannResulttext}>
            {translations.ScannResultScreen.apparelScore || 'Product Score'}: {product.EstimatedSustainabilityScore}/100
          </Text>
          <ScrollView style={{ width: '100%' }}>
              <Text style={theme.ScannResulttext}>
                {translations.ScannResultScreen.productComposition || 'Product Composition'}:
              </Text>
              {materialsInfo.map((material, index) => (
                <Text style={theme.ScannResultMaterialtext} key={index}>-{material.Name}</Text>
              ))}
          </ScrollView>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#006400', '#008000', '#ADFF2F', '#FFD700', '#FFA500', '#FF4500', '#FF0000']}
            style={theme.ScannResultgradientBar}
          >
            <View style={theme.ScannResultgradientTextContainer}>
              <Text style={theme.ScannResultgradientText}>100</Text>

              <Text style={theme.ScannResultgradientText}>80</Text>

              <Text style={theme.ScannResultgradientText}>60</Text>

              <Text style={theme.ScannResultgradientText}>40</Text>

              <Text style={theme.ScannResultgradientText}>20</Text>

              <Text style={theme.ScannResultgradientText}>0</Text>
            </View>
          </LinearGradient>
          <Button title={translations.ScannResultScreen.scanAgain || 'Scan Again'} onPress={() => {() => navigation.navigate('QRCodeScanner')}} />
        </View>
      </View>
    </BaseLayout>
  );
};

const { width } = Dimensions.get('window');


export default ScannResultScreen;
