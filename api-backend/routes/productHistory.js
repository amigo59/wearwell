//productHistory.js
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

// Méthode GET pour récupérer tous les produits
router.get('/', async (req, res) => {
  try {
    // Exécutez la requête pour sélectionner tous les éléments dans la table 'Products'
    const allProducts = await pool.query("SELECT * FROM ProductHistory");
    res.json(allProducts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur lors de la récupération des produits.");
  }
});

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const queryText = `
            SELECT p.ProductID, p.ProductName, p.ImageURL, p.Price, p.SustainabilityScoreID, p.Description, MAX(h.ViewedDate) AS ViewedDate
            FROM ProductHistory h
            INNER JOIN Products p ON h.ProductID = p.ProductID
            WHERE h.UserID = $1
            GROUP BY p.ProductID, p.ProductName, p.ImageURL, p.Price, p.SustainabilityScoreID, p.Description
            ORDER BY MAX(h.ViewedDate) DESC
        `;
        const results = await pool.query(queryText, [userId]);
        const history = results.rows.map(row => ({
            ProductID: row.productid,
            ProductName: row.productname,
            ImageURL: row.imageurl,
            Price: row.price,
            SustainabilityScoreID: row.sustainabilityscoreid,
            Description: row.description,
            ViewedDate: row.vieweddate
            // Ajoutez ou ajustez d'autres champs ici selon le même modèle
        }));
        res.json(history);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'historique de consultation:', error);
        res.status(500).send('Erreur du serveur');
    }
});


router.delete('/:userId/:productId', async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const queryText = 'DELETE FROM ProductHistory WHERE UserID = $1 AND ProductID = $2';
    await pool.query(queryText, [userId, productId]);
    res.json({ message: `Produit avec l'ID ${productId} supprimé de l'historique pour l'utilisateur ${userId}` });
  } catch (error) {
    console.error('Erreur lors de la suppression du produit de l\'historique:', error);
    res.status(500).send('Erreur du serveur');
  }
});

// Route pour enregistrer la vue d'un produit avec userID et productID dans l'URL
router.post('/recordView/:userID/:productID', async (req, res) => {
    const { userID, productID } = req.params; // Utilisation des paramètres d'URL
    const viewedDate = new Date().toISOString();

    try {
        const checkResult = await pool.query(
            'SELECT * FROM ProductHistory WHERE UserID = $1 AND ProductID = $2',
            [userID, productID]
        );
        if (checkResult.rowCount === 0) {
            await pool.query(
                'INSERT INTO ProductHistory (UserID, ProductID, ViewedDate) VALUES ($1, $2, $3)',
                [userID, productID, viewedDate]
            );
            res.status(201).send('Historique de consultation enregistré');
        } else {
            res.status(200).send('Entrée existante trouvée, insertion ignorée');
        }
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement de la vue du produit:', error);
        res.status(500).send('Erreur du serveur lors de l\'enregistrement de la vue du produit.');
    }
});

module.exports = router;
