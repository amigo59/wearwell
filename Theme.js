// themes.js
export const defaultTheme = {
    backgroundColor: '#5E7C5E', // couleur de fond utilisée dans HomePage
    textColor: '#000', // couleur du texte par défaut
    mainFrameBackgroundColor: 'white', // couleur de fond pour mainFrame
    mainTextFontColor: '#5E7C5E', // couleur du texte pour mainText
    scanButtonBackgroundColor: '#5E7C5E', // couleur de fond pour le bouton de scan
    buttonTextFontColor: 'white', // couleur du texte pour le bouton
    frameTitleFontColor: '#5E7C5E', // couleur du texte pour les titres des cadres
    recommendationItemBackgroundColor: 'white', // couleur de fond pour les éléments de recommandation
    productNameFontColor: 'black', // couleur du texte pour les noms de produits
    scoreFontColor: 'green', // couleur du texte pour les scores
    historyItemBackgroundColor: 'white', // couleur de fond pour les éléments d'historique
    historyProductNameFontColor: '#333', // couleur du texte pour les noms de produits dans l'historique
    historyDateFontColor: '#666', // couleur du texte pour les dates dans l'historique
    seeAllLinkFontColor: 'blue', // couleur du texte pour les liens "Voir tout"
    settingsScreenContainer: {
        backgroundColor: '#5E7C5E',
    },
    settingsScreenSection: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 10,
    },
    settingsScreenSectionTitle: {
        fontSize: 18,
        color: '#5E7C5E',
        fontWeight: 'bold',
    },
    settingsScreenSectionContent: {
        fontSize: 16,
        color: 'grey',
    },
    settingsScreenLogoutButton: {
        backgroundColor: 'white',
        padding: 10,
        margin: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    settingsScreenLogoutButtonText: {
        fontSize: 18,
        color: 'red',
        fontWeight: 'bold',
    },
    favoritesScreenContainer: {
        backgroundColor: '#5E7C5E',
    },
    favoritesCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    favoritesProductName: {
        fontWeight: 'bold',
        color: '#5E7C5E',
        fontSize: 16,
    },
    favoritesProductScore: {
        fontSize: 14,
        color: 'green',
    },
    favoritesProductImage: {
       width: 100,
       height: 100,
       borderRadius: 5,
   },
   favoritesTextContainer: {
       marginLeft: 10,
       flex: 1,
   },
   HomePageContainer: { flex: 1, backgroundColor: '#5E7C5E' },
   HomePageLogo: { width: 100, height: 100, alignSelf: 'center', marginTop: 20 },
   HomePageMainFrame: { backgroundColor: 'white', padding: 20, margin: 20, alignItems: 'center', borderRadius: 10 },
   HomePageMainText: { fontSize: 18, color: '#5E7C5E', fontWeight: 'bold', textAlign: 'center' },
   HomePageCameraIcon: { width: 50, height: 50, marginVertical: 10 },
   HomePageScanButton: { backgroundColor: '#5E7C5E', padding: 10, width: '100%', alignItems: 'center', marginTop: 10 },
   HomePageButtonText: { color: 'white', fontSize: 18 },
   HomePageHistoryItemContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#E0E0E0', paddingVertical: 10 },
   HomePageSpacingBelow: { marginBottom: 20 },
   HomePageSubFrame: { backgroundColor: 'white', padding: 20, marginHorizontal: 20, borderRadius: 10,  marginTop: 10, marginBottom: 30  },
   HomePageDeleteIcon: { width: 12, height: 12, marginLeft: 10 },
   HomePageHistoryImage: { width: 20, height: 20, borderRadius: 25 },
   HomePageHistoryProductName: { fontWeight: 'bold', fontSize: 10, color: '#333', flexShrink: 1 },
   HomePageHistoryDate: { fontSize: 10, color: '#666', marginTop: 4 },
   HomePageSubFrameTitle: { fontSize: 14, color: '#5E7C5E', fontWeight: 'bold', marginBottom: 5 },
   HomePageFrameTitle: { fontSize: 16, color: '#5E7C5E', fontWeight: 'bold', marginBottom: 10 },
   HomePageSeeAllLinkContainer: { paddingVertical: 10, alignItems: 'center' },
   HomePageSeeAllLink: { color: 'blue', textDecorationLine: 'underline' },
   HomePageRecommendationsFrame: { backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 20, marginHorizontal: 20, borderRadius: 10},
   HomePageRecommendationCard: { marginRight: 10, width: 170, backgroundColor: 'white', borderRadius: 10, padding: 10, alignItems: 'center' },
   HomePageProductName: { color: 'black', fontWeight: 'bold', fontSize: 10, marginBottom: 5, flexWrap: 'wrap' },
   HomePageScore: { color: 'green', fontSize: 8, marginBottom: 5, textAlign: 'center' },
   HomePageProductImage: { width: 50, height: 50, alignSelf: 'center', marginBottom: 10 },
   HomePageSeeMoreLink: { marginTop: 10, marginLeft: 10 },
   HomePageSeeMoreText: { color: 'blue', fontSize: 14, fontWeight: 'bold' },
   ProfileEditScreenContainer: {
       flex: 1,
       backgroundColor: '#5E7C5E',
   },
   ProfileEditScreenField: {
       flexDirection: 'row',
       alignItems: 'center',
       marginBottom: 10,
   },
   ProfileEditScreenLabel: {
       width: 100,
       color: 'black',
       fontSize: 16,
       fontWeight: 'bold',
   },
   ProfileEditScreenPickerBorder: {
       flex: 1,
       borderWidth: 1,
       borderColor: '#5E7C5E'
   },
   ProfileEditScreenPicker: {
       height: 50,
       color: 'black',
   },
   ProfileEditScreenFormContainer: {
       backgroundColor: 'white',
       padding: 20,
       borderRadius: 10,
       margin: 20,
       alignItems: 'stretch',
   },
   ProfileEditScreenTitle: {
       fontSize: 22,
       fontWeight: 'bold',
       color: '#5E7C5E',
       marginBottom: 20,
   },
   ProfileEditScreenField: {
       flexDirection: 'row',
       alignItems: 'center',
       marginBottom: 10,
   },
   ProfileEditScreenLabel: {
       width: 100,
       fontSize: 16,
       color: 'grey',
       fontWeight: 'bold',
   },
   ProfileEditScreenInput: {
       flex: 1,
       borderWidth: 1,
       borderColor: '#5E7C5E',
       color: 'black',
       padding: 10,
   },
   ProfileEditScreenDatePickerContainer: {
       marginBottom: 10,
   },
   ProfileEditScreenDatePickers: {
       flexDirection: 'row',
       justifyContent: 'space-between',
   },
   ProfileEditScreenButton: {
       backgroundColor: '#5E7C5E',
       padding: 10,
       alignItems: 'center',
       marginTop: 20,
   },
   ProfileEditScreenButtonText: {
       color: 'white',
       fontSize: 18,
   },
   ProfileEditScreenErrorText: {
       color: 'red',
       alignSelf: 'flex-start',
       marginLeft: 15,
       marginBottom: 5,
   },
  ProfileScreenContainer: {
       flex: 1,
       backgroundColor: '#5E7C5E',
  },
  ProfileScreenSection: {
       backgroundColor: 'white',
       padding: 20,
       margin: 20,
       borderRadius: 10,
       marginBottom: 10,
  },
  ProfileScreenSectionTitle: {
       fontSize: 18,
       color: '#5E7C5E',
       fontWeight: 'bold',
       marginBottom: 10,
  },
  ProfileScreenSectionContent: {
       fontSize: 16,
       color: 'grey'
  },
  ProductScreenContainer: {
      flex: 1,
      backgroundColor: '#5E7C5E',
      padding: 10,
  },
  ProductScreenHeaderContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
  },
  ProductScreenProductName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
      flex: 1, // Utilisez flex pour permettre au titre de prendre l'espace disponible
      marginRight: 10, // Ajoutez une marge pour espacer le titre de l'icône
  },
  // Ajoutez un style pour l'icône si nécessaire
  ProductScreenHeartIcon: {
      width: 24, // Définissez la taille souhaitée pour l'icône
      height: 24,
  },
  ProductScreenProductImage: {
      width: '100%',
      height: 300,
      resizeMode: 'contain',
      marginBottom: 10,
  },
  ProductScreenDetailsContainer: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 10,
  },
  ProductScreenPrice: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#5E7C5E',
      marginBottom: 10,
  },
  ProductScreenScore: {
      fontSize: 16,
      color: 'green',
      marginBottom: 10,
  },
  ProductScreenDescription: {
      fontSize: 14,
      color: 'black',
  },
  ProductScreenAddButton: {
      backgroundColor: '#4CAF50',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 30, // Ajout d'un espace en bas
  },
  ProductScreenAddButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
  },
  ProductScreenReviewButton: {
      backgroundColor: '#5E7C5E',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 10,
  },
  ProductScreenReviewButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
  },
  ManageReviewsContainer: {
      flex: 1,
      backgroundColor: '#5E7C5E',
  },
  ManageReviewsReviewItem: {
      backgroundColor: 'white',
      padding: 10,
      margin: 10,
      borderRadius: 10,
  },
  ManageReviewsInput: {
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 10,
      marginBottom: 10,
  },
  ManageReviewsImageTitleContainer: {
     alignItems: 'center', // Centrer les éléments horizontalement
  },
  ManageReviewsProductImage: {
     width: 50,
     height: 50,
     resizeMode: 'contain',
  },
  ManageReviewsProductTitle: {
     fontSize: 10,
     fontWeight: 'bold',
     textAlign: 'center', // Centrer le texte
  },
  ManageReviewsReviewDate: {
     fontSize: 8,
     fontStyle: 'italic',
  },
  ManageReviewsIconsContainer: {
     flexDirection: 'row',
     justifyContent: 'flex-end', // Aligner les icônes à droite
     marginTop: 5,
  },
  ManageReviewsIcon: {
     width: 15,
     height: 15,
     marginLeft: 10, // Espacement entre les icônes
  },
  ManageReviewsNoReviewsText: {
     textAlign: 'center',
     marginTop: 20,
  },
  ScannResultfullScreen: {
      flex: 1,
      backgroundColor: '#5E7C5E', // Couleur de fond utilisée dans HomePage pour defaultTheme
    },
    ScannResultcontainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#5E7C5E',
    },
    ScannResultresultContainer: {
      backgroundColor: 'white', // Fond principal pour les résultats
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '90%',
      height: '80%',
    },
    ScannResultdiamond: {
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      transform: [{ rotate: '45deg' }],
      backgroundColor: '#5E7C5E', // Fond du losange pour defaultTheme
      marginBottom: 15,
    },
    ScannResultdiamondText: {
      color: '#FFF',
      fontSize: 18,
      fontWeight: 'bold',
      transform: [{ rotate: '-45deg' }],
    },
    ScannResulttext: {
      fontSize: 18, // Légère augmentation de la taille pour une meilleure lisibilité
      color: 'black', // Gardez la couleur adaptée au thème
      marginBottom: 15, // Augmenter l'espacement pour une meilleure séparation visuelle
      fontFamily: 'Roboto-Regular', // Utilisez une police standard/appropriée. Assurez-vous d'inclure la police dans votre projet si nécessaire
      letterSpacing: 0.5, // Espacement des lettres pour une meilleure lisibilité
      lineHeight: 24, // Hauteur de ligne pour une meilleure lisibilité du texte
      textAlign: 'center', // Centrer le texte pour un alignement uniforme, ajustez selon le contexte d'utilisation
    },
    ScannResultMaterialtext: {
      fontSize: 14, // Légère augmentation de la taille pour une meilleure lisibilité
      color: 'green', // Gardez la couleur adaptée au thème
      fontFamily: 'Roboto-Regular', // Utilisez une police standard/appropriée. Assurez-vous d'inclure la police dans votre projet si nécessaire
      letterSpacing: 0.5, // Espacement des lettres pour une meilleure lisibilité
      lineHeight: 24, // Hauteur de ligne pour une meilleure lisibilité du texte
      textAlign: 'left', // Centrer le texte pour un alignement uniforme, ajustez selon le contexte d'utilisation
    },

    ScannResultgradientBar: {
      width: '80%',
      height: 20,
      borderRadius: 10,
      marginTop: 15,
      marginBottom: 20,
    },
    ScannResultgradientTextContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    ScannResultgradientText: {
      color: '#FFF',
      fontWeight: 'bold',
    },
    LanguageChangeScreencontainer: {
        flex: 1,
        backgroundColor: '#5E7C5E', // Appliquez la même couleur de fond que SettingsScreen
    },
    LanguageChangeScreenlanguageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white', // Vous pouvez garder l'arrière-plan des boutons en blanc
        margin: 20,
        padding: 10,
        borderRadius: 10,
    },
    LanguageChangeScreenflag: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    LanguageChangeScreenlanguageText: {
        fontSize: 18,
    },

};

export const darkTheme = {
    backgroundColor: '#121212',
    textColor: '#ffffff',
    mainFrameBackgroundColor: '#1e1e1e',
    mainTextFontColor: '#ffffff',
    scanButtonBackgroundColor: '#333333',
    buttonTextFontColor: '#ffffff',
    frameTitleFontColor: '#ffffff',
    recommendationItemBackgroundColor: '#2a2a2a',
    productNameFontColor: '#ffffff',
    scoreFontColor: '#4caf50',
    historyItemBackgroundColor: '#1e1e1e',
    historyProductNameFontColor: '#ffffff',
    historyDateFontColor: '#bbbbbb',
    seeAllLinkFontColor: '#81d4fa',
    frameBackgroundColor: 'grey',
    settingsScreenContainer: {
        backgroundColor: '#121212',
    },
    settingsScreenSection: {
        backgroundColor: '#1e1e1e',
        padding: 20,
        margin: 20,
        borderRadius: 10,
    },
    settingsScreenSectionTitle: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    settingsScreenSectionContent: {
        fontSize: 16,
        color: '#bbbbbb',
    },
    settingsScreenLogoutButton: {
        backgroundColor: '#333333',
        padding: 10,
        margin: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    settingsScreenLogoutButtonText: {
        fontSize: 18,
        color: '#ff5555',
        fontWeight: 'bold',
    },
    favoritesScreenContainer: {
        backgroundColor: '#121212',
    },
    favoritesCard: {
        backgroundColor: '#1e1e1e',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    favoritesProductName: {
        fontWeight: 'bold',
        color: '#ffffff',
        fontSize: 16,
    },
    favoritesProductScore: {
        fontSize: 14,
        color: '#4caf50',
    },
    favoritesProductImage: {
       width: 100,
       height: 100,
       borderRadius: 5,
   },
   favoritesTextContainer: {
       marginLeft: 10,
       flex: 1,
   },
   HomePageContainer: { flex: 1, backgroundColor: '#121212' },
   HomePageLogo: { width: 100, height: 100, alignSelf: 'center', marginTop: 20 },
   HomePageMainFrame: { backgroundColor: '#1e1e1e', padding: 20, margin: 20, alignItems: 'center', borderRadius: 10 },
   HomePageMainText: { fontSize: 18, color: '#ffffff', fontWeight: 'bold', textAlign: 'center' },
   HomePageCameraIcon: { width: 50, height: 50, marginVertical: 10 },
   HomePageScanButton: { backgroundColor: '#333333', padding: 10, width: '100%', alignItems: 'center', marginTop: 10 },
   HomePageButtonText: { color: '#ffffff', fontSize: 18 },
   HomePageHistoryItemContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#424242', paddingVertical: 10 },
   HomePageSpacingBelow: { marginBottom: 20 },
   HomePageSubFrame: { backgroundColor: '#1e1e1e', padding: 20, marginHorizontal: 20, borderRadius: 10 },
   HomePageDeleteIcon: { width: 12, height: 12, marginLeft: 10 },
   HomePageHistoryImage: { width: 20, height: 20, borderRadius: 25 },
   HomePageHistoryProductName: { fontWeight: 'bold', fontSize: 10, color: '#ffffff', flexShrink: 1 },
   HomePageHistoryDate: { fontSize: 10, color: '#bbbbbb', marginTop: 4 },
   HomePageSubFrameTitle: { fontSize: 14, color: '#ffffff', fontWeight: 'bold', marginBottom: 5 },
   HomePageFrameTitle: { fontSize: 16, color: '#ffffff', fontWeight: 'bold', marginBottom: 10 },
   HomePageSeeAllLinkContainer: { paddingVertical: 10, alignItems: 'center' },
   HomePageSeeAllLink: { color: '#81d4fa', textDecorationLine: 'underline' },
   HomePageRecommendationsFrame: { backgroundColor: '#2a2a2a', paddingHorizontal: 20, paddingVertical: 20, marginHorizontal: 20, borderRadius: 10 },
   HomePageRecommendationCard: { marginRight: 10, width: 170, backgroundColor: '#1e1e1e', borderRadius: 10, padding: 10, alignItems: 'center' },
   HomePageProductName: { color: '#ffffff', fontWeight: 'bold', fontSize: 10, marginBottom: 5, flexWrap: 'wrap' },
   HomePageScore: { color: '#4caf50', fontSize: 8, marginBottom: 5, textAlign: 'center' },
   HomePageProductImage: { width: 50, height: 50, alignSelf: 'center', marginBottom: 10 },
   HomePageSeeMoreLink: { marginTop: 10, marginLeft: 10 },
   HomePageSeeMoreText: { color: '#81d4fa', fontSize: 14, fontWeight: 'bold' },
   ProfileEditScreenContainer: {
       flex: 1,
       backgroundColor: '#121212', // Un fond sombre pour améliorer la lisibilité en mode sombre
   },
   ProfileEditScreenField: {
       flexDirection: 'row',
       alignItems: 'center',
       marginBottom: 10,
   },
   ProfileEditScreenLabel: {
       width: 100,
       color: '#ffffff', // Texte blanc pour un contraste élevé
       fontSize: 16,
       fontWeight: 'bold',
   },
   ProfileEditScreenPickerBorder: {
       flex: 1,
       borderWidth: 1,
       borderColor: '#5E7C5E' // Bordure légèrement plus claire pour se démarquer du fond sombre
   },
   ProfileEditScreenPicker: {
       height: 50,
       color: '#ffffff', // Texte blanc pour un contraste élevé
   },
   ProfileEditScreenFormContainer: {
       backgroundColor: '#1e1e1e', // Un fond légèrement plus clair que le fond général pour distinguer les sections
       padding: 20,
       borderRadius: 10,
       margin: 20,
       alignItems: 'stretch',
   },
   ProfileEditScreenTitle: {
       fontSize: 22,
       fontWeight: 'bold',
       color: '#ffffff', // Titre en blanc pour un contraste élevé
       marginBottom: 20,
   },
   ProfileEditScreenInput: {
       flex: 1,
       borderWidth: 1,
       borderColor: '#5E7C5E', // Bordure en couleur pour un contraste suffisant
       color: 'white', // Texte en blanc pour lire facilement
       padding: 10,
   },
   ProfileEditScreenButton: {
       backgroundColor: '#333333', // Un bouton plus sombre pour s'aligner sur le thème
       padding: 10,
       alignItems: 'center',
       marginTop: 20,
   },
   ProfileEditScreenButtonText: {
       color: 'white', // Texte du bouton en blanc pour un contraste élevé
       fontSize: 18,
   },
   ProfileEditScreenErrorText: {
       color: '#ff5555', // Erreur en rouge vif pour attirer l'attention
       alignSelf: 'flex-start',
       marginLeft: 15,
       marginBottom: 5,
   },
   ProfileScreenContainer: {
       flex: 1,
       backgroundColor: '#121212', // Un fond sombre pour une expérience visuelle confortable en mode sombre
   },
   ProfileScreenSection: {
       backgroundColor: '#1e1e1e', // Un fond légèrement plus clair que le fond de l'écran pour une distinction subtile
       padding: 20,
       margin: 20,
       borderRadius: 10,
       marginBottom: 10,
   },
   ProfileScreenSectionTitle: {
       fontSize: 18,
       color: '#ffffff', // Texte blanc pour un contraste élevé avec le fond sombre
       fontWeight: 'bold',
       marginBottom: 10,
   },
   ProfileScreenSectionContent: {
       fontSize: 16,
       color: '#bbbbbb', // Gris clair pour une meilleure lisibilité sans être trop éclatante
   },
   ProductScreenContainer: {
       flex: 1,
       backgroundColor: '#121212', // Fond sombre
       padding: 10,
   },
   ProductScreenHeaderContainer: {
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'space-between',
       padding: 10,
   },
   ProductScreenProductName: {
       fontSize: 18,
       fontWeight: 'bold',
       color: 'white',
       flex: 1,
       marginRight: 10,
   },
   ProductScreenHeartIcon: {
       width: 24,
       height: 24,
   },
   ProductScreenProductImage: {
       width: '100%',
       height: 300,
       resizeMode: 'contain',
       marginBottom: 10,
   },
   ProductScreenDetailsContainer: {
       backgroundColor: '#1e1e1e', // Légèrement plus clair que le fond pour distinguer les détails
       padding: 10,
       borderRadius: 10,
   },
   ProductScreenPrice: {
       fontSize: 20,
       fontWeight: 'bold',
       color: '#ffffff',
       marginBottom: 10,
   },
   ProductScreenScore: {
       fontSize: 16,
       color: '#4caf50', // Vert pour les scores
       marginBottom: 10,
   },
   ProductScreenDescription: {
       fontSize: 14,
       color: '#bbbbbb', // Gris clair pour une meilleure lisibilité
   },
   ProductScreenAddButton: {
       backgroundColor: '#388e3c', // Un vert plus sombre pour le contraste
       paddingVertical: 10,
       paddingHorizontal: 20,
       borderRadius: 5,
       alignItems: 'center',
       marginTop: 10,
       marginBottom: 30, // Ajout d'un espace en bas
   },
   ProductScreenAddButtonText: {
       color: 'white',
       fontSize: 16,
       fontWeight: 'bold',
   },
   ProductScreenReviewButton: {
       backgroundColor: '#333333', // Plus sombre pour le contraste
       paddingVertical: 10,
       paddingHorizontal: 20,
       borderRadius: 5,
       alignItems: 'center',
       marginTop: 10,
   },
   ProductScreenReviewButtonText: {
       color: 'white',
       fontSize: 16,
       fontWeight: 'bold',
   },
   ManageReviewsContainer: {
       flex: 1,
       backgroundColor: '#121212', // Fond sombre
   },
   ManageReviewsReviewItem: {
         backgroundColor: 'white',
         padding: 10,
         margin: 10,
         borderRadius: 10,
     },
     ManageReviewsInput: {
         borderWidth: 1,
         borderColor: '#ddd',
         padding: 10,
         marginBottom: 10,
     },
     ManageReviewsImageTitleContainer: {
        alignItems: 'center', // Centrer les éléments horizontalement
     },
     ManageReviewsProductImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
     },
     ManageReviewsProductTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center', // Centrer le texte
     },
     ManageReviewsReviewDate: {
        fontSize: 8,
        fontStyle: 'italic',
     },
     ManageReviewsIconsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end', // Aligner les icônes à droite
        marginTop: 5,
     },
     ManageReviewsIcon: {
        width: 15,
        height: 15,
        marginLeft: 10, // Espacement entre les icônes
     },
     ManageReviewsNoReviewsText: {
        textAlign: 'center',
        marginTop: 20,
     },
     ScannResultfullScreen: {
        flex: 1,
        backgroundColor: '#121212', // Fond général pour darkTheme
      },
      ScannResultcontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#121212',
      },
      ScannResultresultContainer: {
        backgroundColor: '#1e1e1e', // Fond principal pour les résultats en darkTheme
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '90%',
        height: '80%',
      },
      ScannResultdiamond: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: '45deg' }],
        backgroundColor: '#333333', // Fond du losange en darkTheme
        marginBottom: 15,
      },
      ScannResultdiamondText: {
        color: '#FFF',
        fontWeight: 'bold',
        transform: [{ rotate: '-45deg' }],
        fontSize: 18
      },
      ScannResulttext: {
        fontSize: 18, // Légère augmentation de la taille pour une meilleure lisibilité
        color: 'white', // Gardez la couleur adaptée au thème
        marginBottom: 15, // Augmenter l'espacement pour une meilleure séparation visuelle
        fontFamily: 'Roboto-Regular', // Utilisez une police standard/appropriée. Assurez-vous d'inclure la police dans votre projet si nécessaire
        letterSpacing: 0.5, // Espacement des lettres pour une meilleure lisibilité
        lineHeight: 24, // Hauteur de ligne pour une meilleure lisibilité du texte
        textAlign: 'center', // Centrer le texte pour un alignement uniforme, ajustez selon le contexte d'utilisation
      },
      ScannResultMaterialtext: {
        fontSize: 14, // Légère augmentation de la taille pour une meilleure lisibilité
        color: 'white', // Gardez la couleur adaptée au thème
        fontFamily: 'Roboto-Regular', // Utilisez une police standard/appropriée. Assurez-vous d'inclure la police dans votre projet si nécessaire
        letterSpacing: 0.5, // Espacement des lettres pour une meilleure lisibilité
        lineHeight: 24, // Hauteur de ligne pour une meilleure lisibilité du texte
        textAlign: 'left', // Centrer le texte pour un alignement uniforme, ajustez selon le contexte d'utilisation
      },
      ScannResultgradientBar: {
        width: '80%',
        height: 20,
        borderRadius: 10,
        marginTop: 15,
        marginBottom: 20,
      },
      ScannResultgradientTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      },
      ScannResultgradientText: {
        color: '#FFF',
        fontWeight: 'bold',
      },
      LanguageChangeScreencontainer: {
          flex: 1,
          backgroundColor: '#121212', // Appliquez la même couleur de fond que SettingsScreen
      },
      LanguageChangeScreenlanguageButton: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#2a2a2a', // Vous pouvez garder l'arrière-plan des boutons en blanc
          margin: 20,
          padding: 10,
          borderRadius: 10,
      },
      LanguageChangeScreenflag: {
          width: 40,
          height: 40,
          marginRight: 10,
      },
      LanguageChangeScreenlanguageText: {
          fontSize: 18,
          color:'white',
      },

};



export const lightTheme = {
    backgroundColor: '#f5f5dc',
    textColor: '#000000',
    mainFrameBackgroundColor: '#f5f5f5',
    mainTextFontColor: '#000000',
    scanButtonBackgroundColor: '#5E7C5E',
    buttonTextFontColor: '#ffffff',
    frameTitleFontColor: '#5E7C5E',
    recommendationItemBackgroundColor: '#ffffff',
    productNameFontColor: '#000000',
    scoreFontColor: '#388e3c',
    historyItemBackgroundColor: '#f5f5f5',
    historyProductNameFontColor: '#000000',
    historyDateFontColor: '#666666',
    seeAllLinkFontColor: '#1565c0',
    settingsScreenContainer: {
        backgroundColor: '#f5f5dc',
    },
    settingsScreenSection: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 10,
    },
    settingsScreenSectionTitle: {
        fontSize: 18,
        color: '#5E7C5E',
        fontWeight: 'bold',
    },
    settingsScreenSectionContent: {
        fontSize: 16,
        color: '#666666',
    },
    settingsScreenLogoutButton: {
        backgroundColor: 'white',
        padding: 10,
        margin: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    settingsScreenLogoutButtonText: {
        fontSize: 18,
        color: '#ff4444',
        fontWeight: 'bold',
    },
    favoritesScreenContainer: {
        backgroundColor: '#f5f5dc',
    },
    favoritesCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    favoritesProductName: {
        fontWeight: 'bold',
        color: '#5E7C5E',
        fontSize: 16,
    },
    favoritesProductScore: {
        fontSize: 14,
        color: '#388e3c',
    },
    favoritesProductImage: {
       width: 100,
       height: 100,
       borderRadius: 5,
   },
   favoritesTextContainer: {
       marginLeft: 10,
       flex: 1,
   },
   HomePageContainer: { flex: 1, backgroundColor: '#f5f5dc' },
   HomePageLogo: { width: 100, height: 100, alignSelf: 'center', marginTop: 20 },
   HomePageMainFrame: { backgroundColor: '#ffffff', padding: 20, margin: 20, alignItems: 'center', borderRadius: 10 },
   HomePageMainText: { fontSize: 18, color: '#000000', fontWeight: 'bold', textAlign: 'center' },
   HomePageCameraIcon: { width: 50, height: 50, marginVertical: 10 },
   HomePageScanButton: { backgroundColor: '#5E7C5E', padding: 10, width: '100%', alignItems: 'center', marginTop: 10 },
   HomePageButtonText: { color: '#ffffff', fontSize: 18 },
   HomePageHistoryItemContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#e0e0e0', paddingVertical: 10 },
   HomePageSpacingBelow: { marginBottom: 20 },
   HomePageSubFrame: { backgroundColor: '#ffffff', padding: 20, marginHorizontal: 20, borderRadius: 10 },
   HomePageDeleteIcon: { width: 12, height: 12, marginLeft: 10 },
   HomePageHistoryImage: { width: 20, height: 20, borderRadius: 25 },
   HomePageHistoryProductName: { fontWeight: 'bold', fontSize: 10, color: '#000000', flexShrink: 1 },
   HomePageHistoryDate: { fontSize: 10, color: '#666666', marginTop: 4 },
   HomePageSubFrameTitle: { fontSize: 14, color: '#000000', fontWeight: 'bold', marginBottom: 5 },
   HomePageFrameTitle: { fontSize: 16, color: '#000000', fontWeight: 'bold', marginBottom: 10 },
   HomePageSeeAllLinkContainer: { paddingVertical: 10, alignItems: 'center' },
   HomePageSeeAllLink: { color: '#1565c0', textDecorationLine: 'underline' },
   HomePageRecommendationsFrame: { backgroundColor: '#ffffff', paddingHorizontal: 20, paddingVertical: 20, marginHorizontal: 20, borderRadius: 10 },
   HomePageRecommendationCard: { marginRight: 10, width: 170, backgroundColor: '#ffffff', borderRadius: 10, padding: 10, alignItems: 'center' },
   HomePageProductName: { color: '#000000', fontWeight: 'bold', fontSize: 10, marginBottom: 5, flexWrap: 'wrap' },
   HomePageScore: { color: '#388e3c', fontSize: 8, marginBottom: 5, textAlign: 'center' },
   HomePageProductImage: { width: 50, height: 50, alignSelf: 'center', marginBottom: 10 },
   HomePageSeeMoreLink: { marginTop: 10, marginLeft: 10 },
   HomePageSeeMoreText: { color: '#1565c0', fontSize: 14, fontWeight: 'bold' },
   ProfileEditScreenContainer: {
       flex: 1,
       backgroundColor: '#f5f5dc', // Un fond clair pour le thème lumineux
   },
   ProfileEditScreenField: {
       flexDirection: 'row',
       alignItems: 'center',
       marginBottom: 10,
   },
   ProfileEditScreenLabel: {
       width: 100,
       color: 'black', // Texte en noir pour un contraste standard
       fontSize: 16,
       fontWeight: 'bold',
   },
   ProfileEditScreenPickerBorder: {
       flex: 1,
       borderWidth: 1,
       borderColor: '#5E7C5E', // Bordure qui reste identique pour maintenir la cohérence
   },
   ProfileEditScreenPicker: {
       height: 50,
       color: 'black', // Texte en noir pour le contraste
   },
   ProfileEditScreenFormContainer: {
       backgroundColor: 'white', // Fond blanc pour un look épuré et lumineux
       padding: 20,
       borderRadius: 10,
       margin: 20,
       alignItems: 'stretch',
   },
   ProfileEditScreenTitle: {
       fontSize: 22,
       fontWeight: 'bold',
       color: '#5E7C5E', // Utilisation d'une couleur accentuée pour le titre
       marginBottom: 20,
   },
   ProfileEditScreenInput: {
       flex: 1,
       borderWidth: 1,
       borderColor: '#5E7C5E', // Bordure en couleur pour une séparation claire
       color: 'black', // Texte en noir pour un contraste optimal
       padding: 10,
   },
   ProfileEditScreenButton: {
       backgroundColor: '#5E7C5E', // Bouton en couleur pour contraster avec le fond clair
       padding: 10,
       alignItems: 'center',
       marginTop: 20,
   },
   ProfileEditScreenButtonText: {
       color: 'white', // Texte du bouton en blanc pour contraste
       fontSize: 18,
   },
   ProfileEditScreenErrorText: {
       color: 'red', // Texte d'erreur en rouge pour une signalisation claire
       alignSelf: 'flex-start',
       marginLeft: 15,
       marginBottom: 5,
   },
   ProfileScreenContainer: {
       flex: 1,
       backgroundColor: '#f5f5dc', // Un fond clair pour une apparence fraîche et lumineuse
   },
   ProfileScreenSection: {
       backgroundColor: 'white', // Fond blanc pour conserver une apparence propre et épurée
       padding: 20,
       margin: 20,
       borderRadius: 10,
       marginBottom: 10,
   },
   ProfileScreenSectionTitle: {
       fontSize: 18,
       color: '#5E7C5E', // Utilisation d'une couleur accentuée pour le titre, similaire au thème par défaut
       fontWeight: 'bold',
       marginBottom: 10,
   },
   ProfileScreenSectionContent: {
       fontSize: 16,
       color: 'grey', // Maintien du gris pour le contenu pour une cohérence avec le thème par défaut
   },
   ProductScreenContainer: {
       flex: 1,
       backgroundColor: '#f5f5dc', // Fond clair
       padding: 10,
   },
   ProductScreenHeaderContainer: {
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'space-between',
       padding: 10,
   },
   ProductScreenProductName: {
       fontSize: 18,
       fontWeight: 'bold',
       color: 'black', // Noir pour un meilleur contraste sur fond clair
       flex: 1,
       marginRight: 10,
   },
   ProductScreenHeartIcon: {
       width: 24,
       height: 24,
   },
   ProductScreenProductImage: {
       width: '100%',
       height: 300,
       resizeMode: 'contain',
       marginBottom: 10,
   },
   ProductScreenDetailsContainer: {
       backgroundColor: 'white',
       padding: 10,
       borderRadius: 10,
   },
   ProductScreenPrice: {
       fontSize: 20,
       fontWeight: 'bold',
       color: '#5E7C5E', // Couleur d'accent
       marginBottom: 10,
   },
   ProductScreenScore: {
       fontSize: 16,
       color: 'green',
       marginBottom: 10,
   },
   ProductScreenDescription: {
       fontSize: 14,
       color: 'black',
   },
   ProductScreenAddButton: {
       backgroundColor: '#4CAF50',
       paddingVertical: 10,
       paddingHorizontal: 20,
       borderRadius: 5,
       alignItems: 'center',
       marginTop: 10,
       marginBottom: 30, // Ajout d'un espace en b
   },
   ProductScreenAddButtonText: {
       color: 'white',
       fontSize: 16,
       fontWeight: 'bold',
   },
   ProductScreenReviewButton: {
       backgroundColor: '#5E7C5E',
       paddingVertical: 10,
       paddingHorizontal: 20,
       borderRadius: 5,
       alignItems: 'center',
       marginTop: 10,
   },
   ProductScreenReviewButtonText: {
       color: 'white',
       fontSize: 16,
       fontWeight: 'bold',
   },
   ManageReviewsContainer: {
       flex: 1,
       backgroundColor: '#f5f5dc', // Fond clair
   },
   ManageReviewsReviewItem: {
       backgroundColor: 'white',
       padding: 10,
       margin: 10,
       borderRadius: 10,
   },
   ManageReviewsInput: {
       borderWidth: 1,
       borderColor: '#ddd', // Gris clair pour la bordure
       padding: 10,
       marginBottom: 10,
   },
   ManageReviewsImageTitleContainer: {
       alignItems: 'center',
   },
   ManageReviewsProductImage: {
       width: 50,
       height: 50,
       resizeMode: 'contain',
   },
   ManageReviewsProductTitle: {
       fontSize: 10,
       fontWeight: 'bold',
       textAlign: 'center',
   },
   ManageReviewsReviewDate: {
       fontSize: 8,
       fontStyle: 'italic',
       color: '#666', // Gris foncé pour une meilleure lisibilité
   },
   ManageReviewsIconsContainer: {
       flexDirection: 'row',
       justifyContent: 'flex-end',
       marginTop: 5,
   },
   ManageReviewsIcon: {
       width: 15,
       height: 15,
       marginLeft: 10,
   },
   ManageReviewsNoReviewsText: {
       textAlign: 'center',
       color: '#666', // Gris foncé pour une meilleure lisibilité
       marginTop: 20,
   },
   ScannResultfullScreen: {
       flex: 1,
       backgroundColor: '#f5f5dc', // Fond général pour lightTheme
     },
     ScannResultcontainer: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center',
       backgroundColor: '#f5f5dc',
     },
     ScannResultresultContainer: {
       backgroundColor: '#f5f5f5', // Fond principal pour les résultats en lightTheme
       padding: 20,
       borderRadius: 10,
       alignItems: 'center',
       justifyContent: 'space-around',
       width: '90%',
       height: '80%',
     },
     ScannResultdiamond: {
       width: 60,
       height: 60,
       justifyContent: 'center',
       alignItems: 'center',
       transform: [{ rotate: '45deg' }],
       backgroundColor: '#5E7C5E', // Fond du losange en lightTheme
       marginBottom: 15,
     },
     ScannResultdiamondText: {
       color: '#FFF',
       fontWeight: 'bold',
       transform: [{ rotate: '-45deg' }],
       fontSize: 18
     },
     ScannResulttext: {
       fontSize: 18, // Légère augmentation de la taille pour une meilleure lisibilité
       color: 'black', // Gardez la couleur adaptée au thème
       marginBottom: 15, // Augmenter l'espacement pour une meilleure séparation visuelle
       fontFamily: 'Roboto-Regular', // Utilisez une police standard/appropriée. Assurez-vous d'inclure la police dans votre projet si nécessaire
       letterSpacing: 0.5, // Espacement des lettres pour une meilleure lisibilité
       lineHeight: 24, // Hauteur de ligne pour une meilleure lisibilité du texte
       textAlign: 'center', // Centrer le texte pour un alignement uniforme, ajustez selon le contexte d'utilisation
     },
     ScannResultMaterialtext: {
       fontSize: 14, // Légère augmentation de la taille pour une meilleure lisibilité
       color: 'green', // Gardez la couleur adaptée au thème
       fontFamily: 'Roboto-Regular', // Utilisez une police standard/appropriée. Assurez-vous d'inclure la police dans votre projet si nécessaire
       letterSpacing: 0.5, // Espacement des lettres pour une meilleure lisibilité
       lineHeight: 24, // Hauteur de ligne pour une meilleure lisibilité du texte
       textAlign: 'left', // Centrer le texte pour un alignement uniforme, ajustez selon le contexte d'utilisation
     },
     ScannResultgradientBar: {
       width: '80%',
       height: 20,
       borderRadius: 10,
       marginTop: 15,
       marginBottom: 20,
     },
     ScannResultgradientTextContainer: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       width: '100%',
     },
     ScannResultgradientText: {
       color: '#FFF',
       fontWeight: 'bold',
     },
     LanguageChangeScreencontainer: {
       flex: 1,
       backgroundColor: '#f5f5dc', // Appliquez la même couleur de fond que SettingsScreen
       },
       LanguageChangeScreenlanguageButton: {
           flexDirection: 'row',
           alignItems: 'center',
           backgroundColor: 'white', // Vous pouvez garder l'arrière-plan des boutons en blanc
           margin: 20,
           padding: 10,
           borderRadius: 10,
       },
       LanguageChangeScreenflag: {
           width: 40,
           height: 40,
           marginRight: 10,
       },
       LanguageChangeScreenlanguageText: {
           fontSize: 18,
       },


 };
