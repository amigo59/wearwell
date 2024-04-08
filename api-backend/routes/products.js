//products.js
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
        const results = await pool.query("SELECT * FROM Products");
        const products = results.rows.map(row => ({
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

        }));
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Erreur du serveur lors de la récupération des produits.");
    }
});

// Méthode POST pour ajouter un nouveau produit
/*router.post('/', async (req, res) => {
  try {
    // Destructurez les données reçues dans le corps de la requête
    const { productname, brandId, categoryId, description, price, imageUrl, dateAdded, materialInfo, sustainabilityScoreId, sexe } = req.body;
    // Exécutez la requête d'insertion avec les valeurs fournies
    const newProduct = await pool.query(
      "INSERT INTO Products (ProductName, BrandID, CategoryID, Description, Price, ImageURL, DateAdded, MaterialInfo, SustainabilityScoreID, Sexe) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      [productname, brandId, categoryId, description, price, imageUrl, dateAdded, materialInfo, sustainabilityScoreId, sexe]
    );
    // Renvoyez le produit ajouté dans la réponse
    res.json(newProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur lors de l'ajout du produit.");
  }
});*/
// Méthode POST pour ajouter un nouveau produit
router.post('/', async (req, res) => {
  console.log('Received request to add product:', req.body);
  try {
    const { productname, brandId, categoryId, description, price, imageUrl, dateAdded, materialInfo, sustainabilityScoreId, sexe } = req.body;
    const newProductResult = await pool.query(
      "INSERT INTO Products (ProductName, BrandID, CategoryID, Description, Price, ImageURL, DateAdded, MaterialInfo, SustainabilityScoreID, Sexe) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      [productname, brandId, categoryId, description, price, imageUrl, dateAdded, materialInfo, sustainabilityScoreId, sexe]
    );

    const newProduct = newProductResult.rows[0];

    // Renvoyez le produit ajouté dans la réponse
    res.json(newProduct);

    // Ici, vous notifiez les utilisateurs après l'ajout du produit
    // Ceci est une simplification. En production, vous voudriez probablement exécuter ceci en arrière-plan ou de manière asynchrone pour ne pas retarder la réponse API.
    if (newProduct && newProduct.productid) {
        console.log(`Notifications sent for brand ${brandId}`);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur lors de l'ajout du produit.");
  }
});

// Méthode GET pour récupérer un produit par son ID
router.get('/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
        const result = await pool.query('SELECT * FROM Products WHERE ProductID = $1', [productId]);
        if (result.rows.length > 0) {
            const product = result.rows.map(row => ({
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
            }))[0]; // Prenez le premier (et normalement unique) résultat
            res.json(product);
        } else {
            res.status(404).send('Produit non trouvé');
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Erreur du serveur lors de la récupération du produit.");
    }
});



module.exports = router;
