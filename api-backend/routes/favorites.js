//favorites.js
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
require('dotenv').config();

// Création d'un nouveau pool de connexions en utilisant les variables d'environnement
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Méthode GET pour récupérer tous les favories
router.get('/', async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM Favorites");
        const favorites = results.rows.map(row => ({
            FavoriteID: row.favoriteid,
            ProductID: row.productid,
            UserID: row.userid,
            DateAdded: row.dateadded,
        }));
        res.json(favorites);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Erreur du serveur lors de la récupération des favoris.");
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const queryText = `
            SELECT p.*
            FROM Products p
            INNER JOIN Favorites f ON p.productid = f.productid
            WHERE f.userid = $1;
        `;
        const { rows } = await pool.query(queryText, [userId]);
        // Mappez chaque ligne pour transformer les clés en PascalCase
        const favorites = rows.map(row => {
            return {
                ProductID: row.productid,
                ProductName: row.productname,
                BrandID: row.brandid,
                CategoryID: row.categoryid,
                Description: row.description,
                Price: row.price,
                ImageURL: row.imageurl,
                DateAdded: row.dateadded,
                MaterialInfo: row.materialinfo,
                SustainabilityScoreID: row.sustainabilityscoreid,
                Sexe: row.sexe,
            };
        });
        res.json(favorites);
    } catch (error) {
        console.error('Erreur lors de la récupération des favoris:', error);
        res.status(500).send("Erreur du serveur lors de la récupération des favoris.");
    }
});

router.post('/add/:userID/:productID', async (req, res) => {
    const { userID, productID } = req.params;
    try {
        const result = await pool.query(
            'INSERT INTO Favorites (UserID, ProductID) VALUES ($1, $2) RETURNING *',
            [userID, productID]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Erreur lors de l\'ajout aux favoris:', error);
        res.status(500).send("Erreur du serveur lors de l'ajout aux favoris.");
    }
});


router.delete('/remove/:userID/:productID', async (req, res) => {
  const { userID, productID } = req.params;
  try {
    await pool.query(
      'DELETE FROM Favorites WHERE UserID = $1 AND ProductID = $2',
      [userID, productID]
    );
    res.status(200).send("Produit retiré des favoris.");
  } catch (error) {
    console.error('Erreur lors du retrait des favoris:', error);
    res.status(500).send("Erreur du serveur lors du retrait des favoris.");
  }
});

router.get('/check/:userID/:productID', async (req, res) => {
  const { userID, productID } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM Favorites WHERE UserID = $1 AND ProductID = $2',
      [userID, productID]
    );
    if (result.rows.length > 0) {
      res.json({ isFavorite: true });
    } else {
      res.json({ isFavorite: false });
    }
  } catch (error) {
    console.error('Erreur lors de la vérification des favoris:', error);
    res.status(500).send("Erreur du serveur lors de la vérification des favoris.");
  }
});


module.exports = router;