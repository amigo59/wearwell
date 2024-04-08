import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import HTML from 'react-native-render-html'; // Importez la bibliothèque

const ItemScoreScreen = ({ route }) => {
  const { scannedData } = route.params;
  const [isLoading, setLoading] = useState(true);
  const [scannedText, setScannedText] = useState('');

  useEffect(() => {
    // Effectuez une requête HTTP GET vers l'URL scannée
    fetch(scannedData)
      .then((response) => response.text())
      .then((html) => {
        // Une fois que vous avez récupéré le texte de la page HTML, mettez à jour l'état
        setScannedText(html);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération de la page', error);
        setLoading(false);
      });
  }, [scannedData]);

  // Si la page est en cours de chargement, affichez un indicateur de chargement
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Une fois que le chargement est terminé, affichez le texte extrait dans un ScrollView avec fond transparent
  return (
    <View style={styles.backgroundContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text>Résultat du Scan :</Text>
        <HTML
          source={{ html: scannedText }}
          customHTMLElementModels={{
            svg: {
              contentModel: 'block',
              isVoid: false,
            },
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5E7C5E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#5E7C5E', // Code couleur de l'application
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: 'transparent', // Fond transparent
    padding: 20,
  },
});

export default ItemScoreScreen;
