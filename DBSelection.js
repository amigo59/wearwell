//DBSelection.js
import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
import * as DbPgFunctions from './DbPgFunctions'; // Importez vos fonctions pour PostgreSQL
import * as DbSqliteFunctions from './databaseFunctions'; // Importez vos fonctions pour SQLite

// Cette fonction sélectionne le bon ensemble de fonctions de base de données en fonction de l'environnement et de la connectivité.
export const selectDatabaseFunctions = async () => {
    try {
        // Vérifiez si l'application est exécutée sur un émulateur
        const isEmulator = await DeviceInfo.isEmulator();

        if (isEmulator) {
            // Si l'application est exécutée sur un émulateur, utilisez PostgreSQL
            return DbPgFunctions;
        } else {
            // Si l'application est exécutée sur un appareil réel
            const netInfo = await NetInfo.fetch();
            const isConnected = netInfo.isConnected;

            if (isConnected) {
                // Si l'appareil est connecté, utilisez PostgreSQL
                return DbPgFunctions;
            } else {
                // Si l'appareil n'est pas connecté, utilisez SQLite
                return DbSqliteFunctions;
            }
        }
    } catch (error) {
        console.error('Erreur lors de la sélection de la base de données :', error);
        // En cas d'erreur, utilisez PostgreSQL par défaut
        return DbPgFunctions;
    }
};

// Notez que nous n'exportons pas les fonctions directement, mais plutôt une fonction qui les sélectionne.
// Vous utiliserez `selectDatabaseFunctions` dans vos composants pour obtenir le bon ensemble de fonctions.
export default { selectDatabaseFunctions };