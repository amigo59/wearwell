//databasesFunctions.js
import SQLite from 'react-native-sqlite-storage';
import { useContext } from 'react';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import { getDB } from './db';
import { AuthContext } from './AuthContext'; // Assurez-vous que le chemin est correct

const database_name = "WearWellDB.db";
const database_version = "1.0";
const database_displayname = "WearWell SQLite Database";
const database_size = 200000;

export const fetchProductsFromDatabase = async () => {
    try {
        const query = 'SELECT * FROM Products';
        const db = getDB();
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    query,
                    [],
                    (_, results) => {
                        const rows = results.rows.raw();
                        resolve(rows);
                    },
                    (_, error) => {
                        reject(error);
                    }
                );
            });
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des produits depuis la base de données', error);
        throw error;
    }
};

export const fetchProductFromDatabaseById = async (productId) => {
    try {
        const query = 'SELECT * FROM Products WHERE ProductID = ?';
        const db = getDB();
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    query,
                    [productId],
                    (_, results) => {
                        const rows = results.rows.raw();
                        resolve(rows.length > 0 ? rows[0] : null); // Renvoie le premier produit ou null si aucun produit trouvé
                    },
                    (_, error) => {
                        reject(error);
                    }
                );
            });
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des détails du produit depuis la base de données', error);
        throw error;
    }
};

export const fetchConsultationHistoryFromDatabase = async (userID) => {
    try {
        const db = await getDB();
        console.log('Fetching consultation history for user ID:', userID);

        const results = await db.executeSql(
            'SELECT p.ProductID, p.ProductName, p.ImageURL, p.Price, p.SustainabilityScoreID, p.Description, MAX(h.ViewedDate) as ViewedDate FROM ProductHistory h INNER JOIN Products p ON h.ProductID = p.ProductID WHERE h.UserID = ? GROUP BY p.ProductID, p.ProductName, p.ImageURL ORDER BY MAX(h.ViewedDate) DESC',
            [userID]
        );

        console.log('SQL query executed successfully.');

        if (results && results[0]) {
            console.log('Results found:', results[0].rows.length);
            const history = results[0].rows.raw();
            console.log('History:', history);
            return history;
        } else {
            console.log('No results found.');
            return [];
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'historique de consultation:', error);
        throw error;
    }
};

export const addToFavorites = (userID, productID) => {
    const db = getDB();
    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO Favorites (UserID, ProductID) VALUES (?, ?)',
            [userID, productID],
            () => console.log('Produit ajouté aux favoris'),
            error => console.error('Erreur lors de l\'ajout aux favoris :', error)
        );
    });
};

export const removeFromFavorites = (userID, productID) => {
    const db = getDB();
    db.transaction(tx => {
        tx.executeSql(
            'DELETE FROM Favorites WHERE UserID = ? AND ProductID = ?',
            [userID, productID],
            () => console.log('Produit retiré des favoris'),
            error => console.error('Erreur lors du retrait des favoris :', error)
        );
    });
};

export const checkIfFavorite = async (userId, productId) => {
    try {
        const db = await getDB();
        const query = 'SELECT * FROM Favorites WHERE UserID = ? AND ProductID = ?';
        const params = [userId, productId];

        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    query,
                    params,
                    (tx, results) => {
                        // Si on trouve au moins une entrée, le produit est un favori
                        const isFavorite = results.rows.length > 0;
                        resolve(isFavorite);
                    },
                    (error) => {
                        console.error('Erreur lors de la vérification des favoris:', error);
                        reject(error);
                    }
                );
            });
        });
    } catch (error) {
        console.error('Erreur lors de la vérification des favoris:', error);
        throw error;
    }
};

export const fetchFavoritesFromDatabase = async (userId) => {
    try {
        const db = await getDB(); // Assurez-vous que getDB renvoie la base de données SQLite
        const results = await db.executeSql(
            'SELECT p.* FROM Products p INNER JOIN Favorites f ON p.ProductID = f.ProductID WHERE f.UserID = ? ',
            [userId]
        );

        if (results && results[0]) {
            const favorites = results[0].rows.raw(); // Convertit le résultat en tableau d'objets
            return favorites;
        } else {
            return [];
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des favoris:', error);
        throw error;
    }
};

export const removeFromHistory = async (productId, userId, onSuccess) => {
    const db = getDB();
    // Assurez-vous que la base de données est initialisée et l'utilisateur est connecté
    if (!db || !userId) {
        console.error('Erreur: La base de données n\'est pas initialisée ou aucun utilisateur connecté');
        return;
    }

    db.transaction(tx => {
        tx.executeSql(
            'DELETE FROM ProductHistory WHERE UserID = ? AND ProductID = ?',
            [userId, productId],
            () => {
                console.log(`Produit avec l'ID ${productId} supprimé de l'historique`);
                onSuccess && onSuccess(productId);
            },
            error => {
                console.error('Erreur lors de la suppression du produit de l\'historique:', error);
            }
        );
    });
};

export const fetchUserDataFromDatabase = async (userID) => {
    try {
        const db = await getDB();
        console.log('Fetching user data for user ID:', userID);

        const results = await db.executeSql(
            'SELECT * FROM Users WHERE UserID = ?',
            [userID]
        );

        if (results && results[0]) {
            console.log('User data found:', results[0].rows.length);
            const userData = results[0].rows.raw();
            return userData.length > 0 ? userData[0] : null; // retourne les données du premier utilisateur trouvé
        } else {
            console.log('No user data found.');
            return null;
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
        throw error;
    }
};

export const addReviewToDatabase = (userId, productId, rating, reviewText, onSuccess, onError) => {
    const db = getDB();
    const reviewDate = new Date().toISOString();

    if (!db) {
        console.error('Erreur: La base de données n\'est pas initialisée');
        return;
    }

    db.transaction(tx => {
        // Vérifier d'abord si une revue existe déjà
        tx.executeSql(
            'SELECT * FROM UserReviews WHERE UserID = ? AND ProductID = ?',
            [userId, productId],
            (tx, results) => {
                if (results.rows.length > 0) {
                    // Mise à jour de l'avis existant
                    tx.executeSql(
                        'UPDATE UserReviews SET Rating = ?, ReviewText = ?, ReviewDate = ? WHERE UserID = ? AND ProductID = ?',
                        [parseFloat(rating), reviewText, reviewDate, userId, productId],
                        () => {
                            console.log('Avis mis à jour avec succès');
                            onSuccess();
                        },
                        (error) => {
                            console.error('Erreur lors de la mise à jour de l\'avis :', error);
                            onError(error);
                        }
                    );
                } else {
                    // Insertion d'un nouvel avis
                    tx.executeSql(
                        'INSERT INTO UserReviews (UserID, ProductID, Rating, ReviewText, ReviewDate) VALUES (?, ?, ?, ?, ?)',
                        [userId, productId, parseFloat(rating), reviewText, reviewDate],
                        () => {
                            console.log('Avis ajouté avec succès');
                            onSuccess();
                        },
                        (error) => {
                            console.error('Erreur lors de l\'ajout de l\'avis :', error);
                            onError(error);
                        }
                    );
                }
            },
            (error) => {
                console.error('Erreur lors de la vérification de l\'existence de l\'avis :', error);
                onError(error);
            }
        );
    });
};

export const fetchReviewsForUser = async (userId) => {
  try {
    const db = getDB();
    const query = `
      SELECT p.ProductName, r.Rating, r.ReviewText
      FROM UserReviews r
      JOIN Products p ON r.ProductID = p.ProductID
      WHERE r.UserID = ?
    `;
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          query,
          [userId],
          (_, results) => {
            const reviews = results.rows.raw();
            resolve(reviews);
          },
          (_, error) => {
            console.error('Erreur lors de la récupération des avis de l\'utilisateur:', error);
            reject(error);
          }
        );
      });
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des avis de l\'utilisateur:', error);
    throw error;
  }
};


export const updateUserDataInDatabase = async (userId, userData) => {
    const db = getDB();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE Users SET
                    Name = ?,
                    Surname = ?,
                    Email = ?,
                    Age = ?,
                    Gender = ?,
                    Phone = ?,
                    Location = ?
                 WHERE UserID = ?`,
                [
                    userData.Name,
                    userData.Surname,
                    userData.Email,
                    userData.Age, // Assurez-vous que cela correspond au format attendu pour DateOfBirth
                    userData.Gender,
                    userData.Phone,
                    userData.Location,
                    userId
                ],
                (_, results) => {
                    if (results.rowsAffected > 0) {
                        resolve("User data updated successfully");
                    } else {
                        reject("Failed to update user data");
                    }
                },
                (_, error) => {
                    console.error('Error during user data update:', error);
                    reject(error);
                }
            );
        });
    });
};

export const ChangePassword = async (userId, oldPassword, newPassword) => {
  const db = getDB();

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Vérifier d'abord l'ancien mot de passe
      tx.executeSql(
        'SELECT * FROM Users WHERE UserID = ? AND PasswordHash = ?',
        [userId, oldPassword],
        (_, results) => {
          if (results.rows.length > 0) {
            // Mise à jour du mot de passe
            tx.executeSql(
              'UPDATE Users SET PasswordHash = ? WHERE UserID = ?',
              [newPassword, userId],
              () => resolve(),
              error => reject('Error updating password: ' + error.message)
            );
          } else {
            reject('Old password is incorrect');
          }
        },
        error => reject('Error verifying old password: ' + error.message)
      );
    });
  });
};

export const fetchProductReviews = (productId) => {
  const db = getDB();
  return new Promise((resolve, reject) => {
    // Exécutez la requête SQL pour récupérer les avis du produit spécifique
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM UserReviews WHERE ProductID = ?;',
        [productId],
        (tx, results) => {
          const reviews = [];
          const len = results.rows.length;
          for (let i = 0; i < len; i++) {
            const row = results.rows.item(i);
            // Ajoutez chaque avis à la liste des avis
            reviews.push({
              ReviewID: row.ReviewID,
              UserID: row.UserID,
              ProductID: row.ProductID,
              Rating: row.Rating,
              ReviewText: row.ReviewText,
              ReviewDate: row.ReviewDate,
            });
          }
          // Renvoie la liste des avis récupérés
          resolve(reviews);
        },
        (tx, error) => {
          // En cas d'erreur, rejetez la promesse avec un message d'erreur
          reject(error);
        }
      );
    });
  });
};

export function getNumberOfReviewsForProduct(ProductID) {
  const db = getDB();

  if (!db) {
    console.error('Erreur: La base de données n\'est pas initialisée');
    return Promise.resolve(0); // Retourne 0 en cas d'erreur
  }

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT COUNT(*) AS ReviewCount FROM UserReviews WHERE ProductID = ?',
        [ProductID],
        (tx, results) => {
          if (results.rows.length > 0) {
            const { ReviewCount } = results.rows.item(0);
            resolve(ReviewCount);
          } else {
            resolve(0); // Retourne 0 s'il n'y a pas de reviews
          }
        },
        error => {
          console.error('Erreur lors de la récupération du nombre de reviews :', error);
          reject(error);
        }
      );
    });
  });
};

// Fonction pour mettre à jour un avis
export const updateReview = async (reviewId, rating, reviewText) => {
    try {
        const db = getDB(); // Assurez-vous que getDB renvoie la base de données SQLite
        db.transaction(tx => {
            tx.executeSql(
                'UPDATE UserReviews SET Rating = ?, ReviewText = ? WHERE ReviewID = ?',
                [parseFloat(rating), reviewText, reviewId],
                (_, results) => {
                    console.log('Avis mis à jour avec succès');
                },
                (error) => {
                    console.error('Erreur lors de la mise à jour de l\'avis :', error);
                }
            );
        });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'avis:', error);
        throw error;
    }
};

// Fonction pour supprimer un avis
export const deleteReview = async (reviewId) => {
    try {
        const db = getDB(); // Assurez-vous que getDB renvoie la base de données SQLite
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM UserReviews WHERE ReviewID = ?',
                [reviewId],
                (_, results) => {
                    console.log('Avis supprimé avec succès');
                },
                (error) => {
                    console.error('Erreur lors de la suppression de l\'avis :', error);
                }
            );
        });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'avis:', error);
        throw error;
    }
};

export const fetchReviewsForProduct = async (productId) => {
    try {
        const db = getDB();
        const query = `
            SELECT u.Name, u.Location, r.Rating, r.ReviewText
            FROM UserReviews r
            JOIN Users u ON r.UserID = u.UserID
            WHERE r.ProductID = ?
        `;
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    query,
                    [productId],
                    (_, results) => {
                        const reviews = results.rows.raw();
                        resolve(reviews);
                    },
                    (_, error) => {
                        console.error('Erreur lors de la récupération des avis:', error);
                        reject(error);
                    }
                );
            });
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des avis pour le produit:', error);
        throw error;
    }
};

//databaseFunctions.js
export const fetchReviewsAllProductsForUser = async (userId) => {
  try {
    const db = getDB();
    const query = `
      SELECT
          UserReviews.ReviewID,
          UserReviews.Rating,
          UserReviews.ReviewText,
          UserReviews.ReviewDate,
          Products.ProductName,
          Products.ImageURL
      FROM
          UserReviews
      JOIN Products ON UserReviews.ProductID = Products.ProductID
      WHERE
          UserReviews.UserID = ?
    `;
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          query,
          [userId],
          (_, results) => {
            const reviews = results.rows.raw();
            resolve(reviews);
          },
          (_, error) => {
            console.error('Erreur lors de la récupération des avis de l\'utilisateur:', error);
            reject(error);
          }
        );
      });
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des avis de l\'utilisateur:', error);
    throw error;
  }
};

export const registerUser = (userData, onSuccess, onError) => {
    const db = getDB();
    if (!db) {
        console.error('Erreur: La base de données n\'est pas initialisée');
        Alert.alert('Database Error', 'Database is not initialized');
        return;
    }

    const {
        name, surname, email, password, registrationDate, profilePictureURL,
        age, location, fullPhoneNumber, gender, selectedStyles
    } = userData;

    const styleString = selectedStyles.join(', '); // Convertir le tableau de styles en string

    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO Users (Name, Surname, Email, PasswordHash, RegistrationDate, ProfilePictureURL, Age, Location, Phone, Gender, Style) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name, surname, email, password, registrationDate, profilePictureURL, age, location, fullPhoneNumber, gender, styleString],
            (_, results) => onSuccess(results),
            (_, error) => onError(error)
        );
    });
};


export const fetchScannedProducts = async () => {
    try {
        const query = 'SELECT * FROM ScannedProducts';
        const db = getDB();
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    query,
                    [],
                    (_, results) => {
                        const rows = results.rows.raw();
                        resolve(rows);
                    },
                    (_, error) => {
                        reject(error);
                    }
                );
            });
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des produits depuis la base de données', error);
        throw error;
    }
};

export const fetchMaterialsInfo = async (materialsIds) => {
  const db = getDB(); // Assurez-vous que cette fonction existe et renvoie votre instance de base de données
  if (typeof materialsIds === 'string') {
    materialsIds = materialsIds.split(',');
  }

  const materialsInfo = await Promise.all(materialsIds.map(async (materialId) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT Name, SustainabilityRating FROM MaterialInfo WHERE MaterialID = ?;',
          [materialId],
          (_, result) => {
            if (result.rows.length > 0) {
              resolve(result.rows.item(0));
            } else {
              resolve(null);
            }
          },
          (_, error) => reject(error)
        );
      });
    });
  }));

  return materialsInfo.filter(info => info !== null);
};

export const notifyUsersOfNewProductByFavoriteBrand = async (newProductId, brandId) => {
  const db = getDB(); // Assurez-vous que cette fonction existe et renvoie votre instance de base de données

  const usersToNotify = await new Promise((resolve, reject) => {
    db.transaction(tx => {
      const query = `
        SELECT DISTINCT f.UserID
        FROM Favorites f
        JOIN Products p ON f.ProductID = p.ProductID
        WHERE p.BrandID = ?`;

      tx.executeSql(query, [brandId], (_, results) => {
        if (results.rows.length > 0) {
          resolve(results.rows.raw()); // Convertit le résultat en tableau d'utilisateurs
        } else {
          resolve([]); // Aucun utilisateur à notifier
        }
      }, (_, error) => reject(error));
    });
  });

  const notificationMessage = "Une marque de l'un de vos produits favoris a ajouté un nouveau produit.";
  const currentDate = new Date().toISOString(); // Format ISO pour la date
  const notificationsInsertion = usersToNotify.map(user => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(`
          INSERT INTO Notifications (UserID, Type, Details, DateCreated, ReadStatus, ProductID)
          VALUES (?, ?, ?, ?, ?, ?)`,
          [user.UserID, 'NewProduct', notificationMessage, currentDate, 0, newProductId],
          () => resolve('Notification insérée avec succès'),
          (_, error) => reject(error)
        );
      });
    });
  });

  try {
    await Promise.all(notificationsInsertion);
    console.log('Toutes les notifications ont été insérées avec succès.');
  } catch (error) {
    console.error('Erreur lors de l\'insertion des notifications :', error);
  }
};

