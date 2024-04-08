//db.js
import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "WearWellDB.db";
const database_version = "1.0";
const database_displayname = "WearWell SQLite Database";
const database_size = 200000;

let db;

export function initDB() {
  return SQLite.openDatabase(
    database_name,
    database_version,
    database_displayname,
    database_size
  ).then(DB => {
    db = DB;
    console.log("Database OPEN");
    return db;
  }).catch(error => {
    console.error(error);
  });
}

export function createTables() {
  db.transaction(tx => {
     tx.executeSql(`
            CREATE TABLE IF NOT EXISTS Users (
              UserID INTEGER PRIMARY KEY AUTOINCREMENT,
              Name TEXT,
              Surname TEXT,
              Email TEXT,
              PasswordHash TEXT,
              RegistrationDate TEXT,
              ProfilePictureURL TEXT,
              Age TEXT,
              Location TEXT,
              Phone TEXT,
              Gender TEXT,
              Style Text
            );
          `, [], () => {
            console.log('Table Users créée avec succès');
          }, error => {
            console.error('Erreur lors de la création de la table Users :', error);
            reject(error);
          });

          tx.executeSql(`
            CREATE TABLE IF NOT EXISTS Products (
              ProductID INTEGER PRIMARY KEY AUTOINCREMENT,
              ProductName TEXT,
              BrandID INTEGER,
              CategoryID INTEGER,
              Description TEXT,
              Price REAL,
              ImageURL TEXT,
              DateAdded TEXT,
              MaterialInfo TEXT,
              SustainabilityScoreID INTEGER,
              Sexe TEXT
            );
          `, [], () => {
            console.log('Table Products créée avec succès y compris le Sexeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
          }, error => {
            console.error('Erreur lors de la création de la table Products :', error);
            reject(error);
          });

          tx.executeSql(`
                CREATE TABLE IF NOT EXISTS ProductHistory (
                  HistoryID INTEGER PRIMARY KEY AUTOINCREMENT,
                  UserID INTEGER,
                  ProductID INTEGER,
                  ViewedDate TEXT
            );
          `, [], () => {
            console.log('Table ProductHistory créée avec succès');
          }, error => {
            console.error('Erreur lors de la création de la table ProductHistory :', error);
          });

          tx.executeSql(`
            CREATE TABLE IF NOT EXISTS Brands (
              BrandID INTEGER PRIMARY KEY AUTOINCREMENT,
              BrandName TEXT,
              SustainabilityRating TEXT,
              Location TEXT,
              ContactInfo TEXT,
              WebsiteURL TEXT,
              LogoURL TEXT
            );
          `, [], () => {
            console.log('Table Brands créée avec succès');
          }, error => {
            console.error('Erreur lors de la création de la table Brands :', error);
            reject(error);
          });

          tx.executeSql(`
            CREATE TABLE IF NOT EXISTS Categories (
              CategoryID INTEGER PRIMARY KEY AUTOINCREMENT,
              CategoryName TEXT,
              Description TEXT
            );
          `, [], () => {
            console.log('Table Categories créée avec succès');
          }, error => {
            console.error('Erreur lors de la création de la table Categories :', error);
            reject(error);
          });

          tx.executeSql(`
            CREATE TABLE IF NOT EXISTS FinalSustainabilityScores (
              ScoreID INTEGER PRIMARY KEY AUTOINCREMENT,
              ProductID INTEGER,
              MaterialScore REAL,
              ProductionProcessScore REAL,
              CountryScore REAL,
              TotalScore REAL,
              DateEvaluated TEXT,
              FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
            );
          `, [], () => {
            console.log('Table SustainabilityScores créée avec succès');
          }, error => {
            console.error('Erreur lors de la création de la table SustainabilityScores :', error);
            reject(error);
          });

          tx.executeSql(`
            CREATE TABLE IF NOT EXISTS UserReviews (
              ReviewID INTEGER PRIMARY KEY AUTOINCREMENT,
              UserID INTEGER,
              ProductID INTEGER,
              Rating REAL,
              ReviewText TEXT,
              ReviewDate TEXT
            );
          `, [], () => {
            console.log('Table UserReviews créée avec succès');
          }, error => {
            console.error('Erreur lors de la création de la table UserReviews :', error);
            reject(error);
          });

          tx.executeSql(`
            CREATE TABLE IF NOT EXISTS Favorites (
              FavoriteID INTEGER PRIMARY KEY AUTOINCREMENT,
              UserID INTEGER,
              ProductID INTEGER,
              DateAdded TEXT
            );
          `, [], () => {
            console.log('Table Favorites créée avec succès');
          }, error => {
            console.error('Erreur lors de la création de la table Favorites :', error);
            reject(error);
          });

          tx.executeSql(`
            CREATE TABLE IF NOT EXISTS Transactions (
              TransactionID INTEGER PRIMARY KEY AUTOINCREMENT,
              UserID INTEGER,
              ProductID INTEGER,
              TransactionDate TEXT,
              Amount REAL,
              PaymentMethod TEXT,
              PaymentStatus TEXT
            );
          `, [], () => {
            console.log('Table Transactions créée avec succès');
          }, error => {
            console.error('Erreur lors de la création de la table Transactions :', error);
            reject(error);
          });

          tx.executeSql(`
            CREATE TABLE IF NOT EXISTS Authentication (
              AuthID INTEGER PRIMARY KEY AUTOINCREMENT,
              UserID INTEGER,
              Token TEXT,
              ExpiryDate TEXT,
              DeviceInfo TEXT
            );
          `, [], () => {
            console.log('Table Authentication créée avec succès');
          }, error => {
            console.error('Erreur lors de la création de la table Authentication :', error);
            reject(error);
          });

      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS Notifications (
          NotificationID INTEGER PRIMARY KEY AUTOINCREMENT,
          UserID INTEGER,
          Type TEXT,
          Details TEXT,
          DateCreated TEXT,
          ReadStatus INTEGER DEFAULT 0,
          FOREIGN KEY (UserID) REFERENCES Users(UserID)
        );
      `, [], () => {
        console.log('Table Notifications créée avec succès');
      }, error => {
        console.error('Erreur lors de la création de la table Notifications :', error);
        reject(error);
      });

        tx.executeSql(`
          CREATE TABLE IF NOT EXISTS Feedback (
            FeedbackID INTEGER PRIMARY KEY AUTOINCREMENT,
            UserID INTEGER,
            FeedbackText TEXT,
            DateSubmitted TEXT,
            ResponseStatus TEXT
          );
        `, [], () => {
          console.log('Table Feedback créée avec succès');
        }, error => {
          console.error('Erreur lors de la création de la table Feedback :', error);
          reject(error);
        });

        tx.executeSql(`
            CREATE TABLE IF NOT EXISTS MaterialInfo  (
              MaterialID INTEGER PRIMARY KEY AUTOINCREMENT,
              Name TEXT,
              Category TEXT,
              SustainabilityRating INTEGER
            );
          `, [], () => {
            console.log('Table MaterialInfo créée avec succès');
          }, error => {
            console.error('Erreur lors de la création de la table MaterialInfo :', error);
            reject(error);
        });

        tx.executeSql(`
            CREATE TABLE IF NOT EXISTS ProductionProcesses (
              ProcessID INTEGER PRIMARY KEY AUTOINCREMENT,
              Name TEXT,
              Description TEXT,
              SustainabilityRating INTEGER
            );
          `, [], () => {
            console.log('Table ProductionProcesses créée avec succès');
          }, error => {
            console.error('Erreur lors de la création de la table ProductionProcesses :', error);
            reject(error);
        });

        tx.executeSql(`
            CREATE TABLE IF NOT EXISTS Countries (
              CountryID INTEGER PRIMARY KEY AUTOINCREMENT,
              Name TEXT,
              LaborEnvironmentalStandardsRating INTEGER
            );

          `, [], () => {
            console.log('Table Countries créée avec succès');
          }, error => {
            console.error('Erreur lors de la création de la table Countries :', error);
            reject(error);
        });

        tx.executeSql(`
            CREATE TABLE IF NOT EXISTS ScannedProducts (
              ID INTEGER PRIMARY KEY AUTOINCREMENT,
              Brand TEXT,
              MaterialsIds TEXT, -- Liste des ID de matériaux, séparés par des virgules
              CountryID INTEGER,
              ProcessIDs TEXT, -- Liste des ID de processus de production, séparés par des virgules
              DateScanned TEXT, -- Date à laquelle le produit a été scanné
              EstimatedSustainabilityScore REAL, -- Score de durabilité estimé (peut être calculé et mis à jour ultérieurement)
              FOREIGN KEY (CountryID) REFERENCES Countries(CountryID)
            );

          `, [], () => {
            console.log('Table ScannedProducts créée avec succès !');
          }, error => {
            console.error('Erreur lors de la création de la table ScannedProducts :', error);
            reject(error);
          });


    // Ajoutez ici d'autres tables si nécessaire
  }).then(() => {
    console.log("Tables Created");
  }).catch(error => {
    console.error(error);
  });
}

export const getDB = () => {
  return db;
}