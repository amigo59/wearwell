// DbPgFunctions.js
const apiUrl = 'http://192.168.1.21:3000';

// Cette fonction effectue une demande de connexion pour un utilisateur et renvoie les données de l'utilisateur si la connexion réussit.
export const authenticateUser = async (email, password) => {
  try {
    const response = await fetch(`${apiUrl}/users/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.success && data.user) {
      return data.user; // Retourne directement l'objet utilisateur
    } else {
      return null; // ou une structure d'erreur spécifique
    }
  } catch (error) {
    console.error('Could not authenticate user: ', error);
    throw error; // Renvoie l'erreur pour un traitement ultérieur
  }
};


export const fetchProductsFromDatabase = async () => {
  try {
    // Cette URL devrait pointer vers votre API qui renvoie un tableau d'objets produit.
    const response = await fetch(`${apiUrl}/products`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // La réponse ici est attendue comme un tableau d'objets directement, similaire à ce que vous auriez avec SQLite.
    const products = await response.json();
    return products; // Cela devrait être un tableau d'objets produit.
  } catch (error) {
    console.error("Could not fetch products: ", error);
    throw error; // L'erreur est renvoyée pour être éventuellement gérée par l'appelant.
  }
};

export const fetchProductFromDatabaseById = async (productId) => {
  try {
    // Cette URL devrait pointer vers votre API qui renvoie un tableau d'objets produit.
    const response = await fetch(`${apiUrl}/products/${productId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // La réponse ici est attendue comme un tableau d'objets directement, similaire à ce que vous auriez avec SQLite.
    const product = await response.json();
    console.log(`Product data received for productId: ${productId}`);
    return product; // Cela devrait être un tableau d'objets produit.
  } catch (error) {
    console.error("Could not fetch products: ", error);
    throw error; // L'erreur est renvoyée pour être éventuellement gérée par l'appelant.
  }
};


// Cette fonction récupère l'historique de consultation d'un utilisateur.
export const fetchConsultationHistoryFromDatabase = async (userId) => {
  try {
    // Remplacez les guillemets simples par des backticks pour permettre l'interpolation de la variable
    const response = await fetch(`${apiUrl}/productHistory/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Could not fetch consultation history: ", error);
    throw error;  // Permet la gestion de l'erreur à un niveau supérieur
  }
};


// Cette fonction supprime un produit de l'historique de consultation d'un utilisateur.
export const removeFromHistory = async (userId, productId) => {
  try {
    const response = await fetch(`${apiUrl}/productHistory/${userId}/${productId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Could not remove product from history: ", error);
    throw error;
  }
};

export const notifyUsersOfNewProductByFavoriteBrandAPI = async (newProductId, brandId) => {
  try {
    const response = await fetch(`${apiUrl}/api/notifications/notifyNewProduct`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newProductId, brandId }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error("Could not send notifications: ", error);
    throw error;
  }
};

export const addToFavorites = async (userID, productID) => {
    try {
        const response = await fetch(`${apiUrl}/favorites/add/${userID}/${productID}`, {
            method: 'POST',
        });
        if (!response.ok) {
            // Ceci gère le cas où la réponse n'est pas un succès HTTP (200-299)
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Vérifiez si la réponse a un corps avant de tenter de la convertir en JSON
        if (response.status !== 204) { // 204 No Content signifie qu'il n'y a pas de corps dans la réponse
            const data = await response.json();
            console.log('Produit ajouté aux favoris', data); // Log la réponse du serveur.
            return data; // Retournez la réponse pour un traitement ultérieur.
        } else {
            console.log('Produit ajouté aux favoris sans contenu de retour'); // Log si l'API n'a pas renvoyé de contenu.
            return null;
        }
    } catch (error) {
        console.error('Erreur lors de l\'ajout aux favoris:', error);
        throw error; // Propagez l'erreur.
    }
};

export const removeFromFavorites = async (userID, productID) => {
    try {
        const response = await fetch(`${apiUrl}/favorites/remove/${userID}/${productID}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            // Gère le cas où la réponse n'est pas un succès HTTP (200-299)
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Si vous attendez un corps de réponse, assurez-vous qu'il est au format JSON avant de l'analyser.
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
            const data = await response.json();
            console.log('Produit retiré des favoris', data); // Log la réponse du serveur.
            return data; // Retourne la réponse pour un traitement ultérieur.
        } else {
            console.log('Produit retiré des favoris sans contenu de retour'); // Log si l'API n'a pas renvoyé de contenu.
            return 'Produit retiré des favoris'; // Ou null, selon la logique de votre application.
        }
    } catch (error) {
        console.error('Erreur lors de la suppression des favoris:', error);
        throw error; // Propage l'erreur.
    }
};


/*export const removeFromFavorites = async (userID, productID) => {
  try {
    await fetch(`${apiUrl}/favorites/remove/${userID}/${productID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userID, productID }),
    });
    console.log('Produit retiré des favoris');
  } catch (error) {
    console.error('Erreur lors du retrait des favoris :', error);
  }
};*/

export const checkIfFavorite = async (userID, productID) => {
  try {
    const response = await fetch(`${apiUrl}/favorites/check/${userID}/${productID}`);
    const isFavorite = await response.json();
    return isFavorite;
  } catch (error) {
    console.error('Erreur lors de la vérification des favoris:', error);
    throw error;
  }
};

export async function getNumberOfReviewsForProduct(productId)  {
  try {
    const response = await fetch(`${apiUrl}/reviews/${productId}/reviewCount`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.ReviewCount;
  } catch (error) {
    console.error('Erreur lors de la récupération du nombre de reviews:', error);
    return 0; // Retourne 0 en cas d'erreur
  }
};

export const addReviewToDatabase = async (userId, productId, rating, reviewText) => {
    try {
      const response = await fetch(`${apiUrl}/reviews/addReview`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         userId,
         productId,
         rating,
         reviewText,
       }),
      });

      if (!response.ok) {
          throw new Error('Erreur réseau ou réponse du serveur non OK');
      }

      const jsonResponse = await response.json();
      console.log(jsonResponse.message);

      // Gérer la réponse ici. Par exemple, afficher un message de succès ou d'erreur à l'utilisateur.
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'avis:', error);
      // Gérer l'erreur ici. Par exemple, afficher un message d'erreur à l'utilisateur.
    }
};

// Assurez-vous que `apiUrl` est défini dans votre fichier, par exemple:
// const apiUrl = 'http://192.168.1.21:3000';

export const fetchFavoritesFromDatabase = async (userId) => {
    try {
        const response = await fetch(`${apiUrl}/favorites/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const favorites = await response.json();
        return favorites;
    } catch (error) {
        console.error('Erreur lors de la récupération des favoris:', error);
        throw error;
    }
};

export const fetchReviewsForProduct = async (productId) => {
    try {
        const response = await fetch(`${apiUrl}/reviews/${productId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(`Reviews data received for productId: ${productId}`);
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des avis pour le produit:', error);
        throw error; // Propager l'erreur pour une gestion ultérieure
    }
};

// Mise à jour d'une revue par son ID
export const updateReview = async (reviewId, rating, reviewText) => {
    try {
        const response = await fetch(`${apiUrl}/reviews/update/${reviewId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                rating,
                reviewText,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Review updated:", data);
        return data;
    } catch (error) {
        console.error('Error updating review:', error);
        throw error;
    }
};

// Suppression d'une revue par son ID
export const deleteReview = async (reviewId) => {
    try {
        const response = await fetch(`${apiUrl}/reviews/delete/${reviewId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log("Review deleted successfully");
        return true; // Vous pouvez retourner une valeur ou un objet selon votre convenance
    } catch (error) {
        console.error('Error deleting review:', error);
        throw error;
    }
};

// Récupération de toutes les revues d'un utilisateur par son ID
export const fetchReviewsAllProductsForUser = async (userId) => {
    try {
        const response = await fetch(`${apiUrl}/reviews/user/${userId}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const reviews = await response.json();
        console.log("Fetched reviews for user:", reviews);
        return reviews;
    } catch (error) {
        console.error('Error fetching reviews for user:', error);
        throw error;
    }
};

// Dans dbpgfunctions.js

export const fetchUserDataFromDatabase = async (userId) => {
    // Implémentation fictive - Remplacez par votre logique d'appel API
    const response = await fetch(`${apiUrl}/users/${userId}`);
    const data = await response.json();
    return data;
};

export const updateUserDataInDatabase = async (userId, userData) => {
    // Implémentation fictive - Remplacez par votre logique d'appel API
    console.log("Profile updated:", userData);
    const response = await fetch(`${apiUrl}/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
};

export const changePassword = async (userId, oldPassword, newPassword) => {
  try {
      const response = await fetch(`${apiUrl}/users/${userId}/changePassword`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ oldPassword, newPassword }),
      });

      const responseBody = await response.text(); // Toujours lire la réponse comme texte d'abord
      console.log('Response Body:', responseBody);

      if (!response.ok) {
          throw new Error('Failed to change password. Status: ' + response.status);
      }

      // Tenter d'analyser le corps de la réponse en tant que JSON
      // si nous nous attendons à un JSON en cas de succès.
      let responseData = {};
      try {
          responseData = JSON.parse(responseBody);
      } catch (parseError) {
          console.error('Error parsing JSON:', parseError);
          // Gérer l'erreur d'analyse JSON ici, si nécessaire
      }

      return responseData;
  } catch (error) {
      console.error('Error changing password:', error);
      throw error;
  }

};
/*
export const fetchProductFromDatabaseById = async (productId) => {
  try {
    const { rows } = await pool.query('SELECT * FROM Products WHERE ProductID = $1', [productId]);
    return rows.length > 0 ? rows[0] : null; // Renvoie le premier produit ou null si aucun produit trouvé
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du produit depuis la base de données', error);
    throw error;
  }
};

// Adaptation d'une fonction pour ajouter un produit aux favoris
export const addToFavorites = async (userID, productID) => {
  try {
    await pool.query('INSERT INTO Favorites (UserID, ProductID) VALUES ($1, $2)', [userID, productID]);
    console.log('Produit ajouté aux favoris');
  } catch (error) {
    console.error('Erreur lors de l\'ajout aux favoris :', error);
  }
};

// Adaptation d'une fonction pour supprimer un produit des favoris
export const removeFromFavorites = async (userID, productID) => {
  try {
    await pool.query('DELETE FROM Favorites WHERE UserID = $1 AND ProductID = $2', [userID, productID]);
    console.log('Produit retiré des favoris');
  } catch (error) {
    console.error('Erreur lors du retrait des favoris :', error);
  }
};

export const checkIfFavorite = async (userId, productId) => {
    try {
        // Utilisation du pool PostgreSQL pour exécuter la requête
        const queryText = 'SELECT * FROM Favorites WHERE UserID = $1 AND ProductID = $2';
        const { rows } = await pool.query(queryText, [userId, productId]);

        // Si on trouve au moins une entrée, le produit est un favori
        const isFavorite = rows.length > 0;
        return isFavorite;
    } catch (error) {
        console.error('Erreur lors de la vérification des favoris:', error);
        throw error;
    }
};

export const fetchFavoritesFromDatabase = async (userId) => {
    try {
        // Utilisez directement le pool de connexions PostgreSQL pour exécuter la requête
        const queryText = `
            SELECT p.*
            FROM Products p
            INNER JOIN Favorites f ON p.ProductID = f.ProductID
            WHERE f.UserID = $1;
        `;
        const { rows } = await pool.query(queryText, [userId]);

        // rows contiendra directement les produits favoris de l'utilisateur
        return rows;
    } catch (error) {
        console.error('Erreur lors de la récupération des favoris:', error);
        throw error;
    }
};

export const fetchUserDataFromDatabase = async (userID) => {
    try {
        // Utilisez directement le pool de connexions PostgreSQL pour exécuter la requête
        const queryText = 'SELECT * FROM Users WHERE UserID = $1';
        const { rows } = await pool.query(queryText, [userID]);

        console.log('Fetching user data for user ID:', userID);
        if (rows.length > 0) {
            console.log('User data found:', rows.length);
            return rows[0]; // Retourne les données du premier utilisateur trouvé
        } else {
            console.log('No user data found.');
            return null;
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
        throw error;
    }
};

export const addReviewToDatabase = async (userId, productId, rating, reviewText, onSuccess, onError) => {
    try {
        // Vérifier d'abord si une revue existe déjà
        const checkQuery = `
            SELECT * FROM UserReviews
            WHERE UserID = $1 AND ProductID = $2;
        `;
        const { rows: checkRows } = await pool.query(checkQuery, [userId, productId]);
        const reviewDate = new Date().toISOString();

        if (checkRows.length > 0) {
            // Mise à jour de l'avis existant
            const updateQuery = `
                UPDATE UserReviews
                SET Rating = $1, ReviewText = $2, ReviewDate = $3
                WHERE UserID = $4 AND ProductID = $5;
            `;
            await pool.query(updateQuery, [parseFloat(rating), reviewText, reviewDate, userId, productId]);
            console.log('Avis mis à jour avec succès');
            onSuccess();
        } else {
            // Insertion d'un nouvel avis
            const insertQuery = `
                INSERT INTO UserReviews (UserID, ProductID, Rating, ReviewText, ReviewDate)
                VALUES ($1, $2, $3, $4, $5);
            `;
            await pool.query(insertQuery, [userId, productId, parseFloat(rating), reviewText, reviewDate]);
            console.log('Avis ajouté avec succès');
            onSuccess();
        }
    } catch (error) {
        console.error('Erreur lors de l\'ajout ou de la mise à jour de l\'avis:', error);
        if (onError) onError(error);
    }
};

export const fetchReviewsForUser = async (userId) => {
  try {
    const query = `
      SELECT p.ProductName, r.Rating, r.ReviewText
      FROM UserReviews r
      JOIN Products p ON r.ProductID = p.ProductID
      WHERE r.UserID = $1;
    `;
    const { rows } = await pool.query(query, [userId]);

    // rows contiendront directement les avis de l'utilisateur
    return rows;
  } catch (error) {
    console.error('Erreur lors de la récupération des avis de l\'utilisateur:', error);
    throw error;
  }
};

export const updateUserDataInDatabase = async (userId, userData) => {
    try {
        const updateQuery = `
            UPDATE Users SET
                Name = $1,
                Surname = $2,
                Email = $3,
                Age = $4,
                Gender = $5,
                Phone = $6,
                Location = $7
            WHERE UserID = $8
            RETURNING *;`;

        const values = [
            userData.Name,
            userData.Surname,
            userData.Email,
            userData.Age, // Assurez-vous que cela correspond au format attendu pour l'âge
            userData.Gender,
            userData.Phone,
            userData.Location,
            userId
        ];

        const { rows } = await pool.query(updateQuery, values);

        // Vérifier si la mise à jour a affecté des lignes
        if (rows.length > 0) {
            console.log("User data updated successfully");
            return rows[0]; // Retourne les données mises à jour de l'utilisateur
        } else {
            throw new Error("Failed to update user data");
        }
    } catch (error) {
        console.error('Error during user data update:', error);
        throw error; // Relancez l'erreur pour la gestion d'erreur extérieure
    }
};

export const ChangePassword = async (userId, oldPassword, newPassword) => {
    try {
        // Étape 1: Vérifier l'ancien mot de passe
        const verifyPasswordQuery = `
            SELECT * FROM Users
            WHERE UserID = $1 AND PasswordHash = $2;
        `;
        const verifyRes = await pool.query(verifyPasswordQuery, [userId, oldPassword]);

        if (verifyRes.rows.length === 0) {
            throw new Error('Old password is incorrect');
        }

        // Étape 2: Mise à jour du mot de passe
        const updatePasswordQuery = `
            UPDATE Users
            SET PasswordHash = $1
            WHERE UserID = $2;
        `;
        await pool.query(updatePasswordQuery, [newPassword, userId]);

        return "Password updated successfully";
    } catch (error) {
        console.error('Error updating password:', error);
        throw error; // Propager l'erreur pour gestion ultérieure
    }
};

export const fetchProductReviews = async (productId) => {
  try {
    // Préparer la requête SQL pour récupérer les avis d'un produit spécifique
    const query = `
      SELECT * FROM UserReviews
      WHERE ProductID = $1;
    `;
    const { rows } = await pool.query(query, [productId]);

    // Transformer les résultats pour correspondre à la structure attendue
    const reviews = rows.map(row => ({
      ReviewID: row.reviewid, // Assurez-vous que les noms de colonnes correspondent à ceux de votre DB
      UserID: row.userid,
      ProductID: row.productid,
      Rating: row.rating,
      ReviewText: row.reviewtext,
      ReviewDate: row.reviewdate,
    }));

    return reviews;
  } catch (error) {
    console.error('Error fetching product reviews:', error);
    throw error; // Propager l'erreur pour gestion ultérieure
  }
};

export const getNumberOfReviewsForProduct = async (ProductID) => {
  try {
    const query = `
      SELECT COUNT(*) AS ReviewCount
      FROM UserReviews
      WHERE ProductID = $1;
    `;
    const response = await pool.query(query, [ProductID]);
    // PostgreSQL renvoie le compte dans le premier rangée de la réponse
    const reviewCount = parseInt(response.rows[0].reviewcount, 10);
    return reviewCount;
  } catch (error) {
    console.error('Erreur lors de la récupération du nombre de reviews:', error);
    // Vous pourriez vouloir gérer l'erreur d'une manière spécifique ou juste la renvoyer
    throw error;
  }
};

export const updateReview = async (reviewId, rating, reviewText) => {
    try {
        // Préparer la requête SQL pour mettre à jour un avis
        const query = `
          UPDATE UserReviews
          SET Rating = $1, ReviewText = $2
          WHERE ReviewID = $3
          RETURNING *;  // Cette ligne est optionnelle et retourne l'avis mis à jour
        `;

        // Exécuter la requête SQL avec les valeurs fournies
        const { rows } = await pool.query(query, [parseFloat(rating), reviewText, reviewId]);

        if(rows.length > 0) {
          console.log('Avis mis à jour avec succès', rows[0]); // Affiche l'avis mis à jour si vous utilisez RETURNING *
        } else {
          console.log('Aucun avis trouvé avec cet ID pour mise à jour');
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'avis:', error);
        throw error;  // Propager l'erreur pour une gestion ultérieure
    }
};

export const deleteReview = async (reviewId) => {
    try {
        // Préparer la requête SQL pour supprimer un avis spécifique
        const query = 'DELETE FROM UserReviews WHERE ReviewID = $1 RETURNING *;'; // RETURNING * est optionnel et renvoie l'avis supprimé

        // Exécuter la requête SQL avec l'ID de l'avis comme paramètre
        const { rows } = await pool.query(query, [reviewId]);

        if(rows.length > 0) {
          console.log('Avis supprimé avec succès', rows[0]); // Affiche l'avis supprimé si vous utilisez RETURNING *
        } else {
          console.log('Aucun avis trouvé avec cet ID pour suppression');
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'avis:', error);
        throw error;  // Propager l'erreur pour une gestion ultérieure
    }
};

export const fetchReviewsForProduct = async (productId) => {
    try {
        // Requête SQL pour récupérer les avis avec les détails de l'utilisateur
        const query = `
            SELECT u.Name, u.Location, r.Rating, r.ReviewText
            FROM UserReviews r
            JOIN Users u ON r.UserID = u.UserID
            WHERE r.ProductID = $1
        `;

        // Exécutez la requête SQL avec l'ID du produit comme paramètre
        const { rows } = await pool.query(query, [productId]);

        // Renvoie les avis récupérés
        return rows;
    } catch (error) {
        console.error('Erreur lors de la récupération des avis pour le produit:', error);
        throw error; // Propager l'erreur pour une gestion ultérieure
    }
};

// Fonction pour récupérer les avis de tous les produits pour un utilisateur spécifique
export const fetchReviewsAllProductsForUser = async (userId) => {
    try {
        // Requête SQL pour récupérer les avis avec les détails des produits
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
                UserReviews.UserID = $1
        `;

        // Exécutez la requête SQL avec l'ID de l'utilisateur comme paramètre
        const { rows } = await pool.query(query, [userId]);

        // Renvoie les avis récupérés
        return rows;
    } catch (error) {
        console.error('Erreur lors de la récupération des avis de l\'utilisateur:', error);
        throw error; // Propager l'erreur pour une gestion ultérieure
    }
};

export const registerUser = async (userData, onSuccess, onError) => {
    try {
        const {
            name, surname, email, password, registrationDate, profilePictureURL,
            age, location, fullPhoneNumber, gender, selectedStyles
        } = userData;

        const styleString = selectedStyles.join(', ');

        const query = `
            INSERT INTO Users (Name, Surname, Email, PasswordHash, RegistrationDate, ProfilePictureURL, Age, Location, Phone, Gender, Style)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `;

        await pool.query(query, [name, surname, email, password, registrationDate, profilePictureURL, age, location, fullPhoneNumber, gender, styleString]);
        onSuccess();
    } catch (error) {
        console.error('Error registering user:', error);
        onError(error);
    }
};

export const fetchScannedProducts = async () => {
    try {
        const query = 'SELECT * FROM ScannedProducts';
        const { rows } = await pool.query(query);
        return rows;
    } catch (error) {
        console.error('Error fetching scanned products:', error);
        throw error;
    }
};

export const fetchMaterialsInfo = async (materialsIds) => {
    try {
        const query = `
            SELECT Name, SustainabilityRating
            FROM MaterialInfo
            WHERE MaterialID = ANY($1)
        `;
        const { rows } = await pool.query(query, [materialsIds]);
        return rows;
    } catch (error) {
        console.error('Error fetching materials info:', error);
        throw error;
    }
};

export const notifyUsersOfNewProductByFavoriteBrand = async (newProductId, brandId) => {
    try {
        const query = `
            INSERT INTO Notifications (UserID, Type, Details, DateCreated, ReadStatus, ProductID)
            SELECT DISTINCT f.UserID, 'NewProduct', 'Une marque de l\'un de vos produits favoris a ajouté un nouveau produit.', NOW(), 0, $1
            FROM Favorites f
            JOIN Products p ON f.ProductID = p.ProductID
            WHERE p.BrandID = $2
        `;
        await pool.query(query, [newProductId, brandId]);
        console.log('All notifications inserted successfully.');
    } catch (error) {
        console.error('Error inserting notifications:', error);
        throw error;
    }
};*/



