//notifications.js
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

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Notifications');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Erreur lors de la récupération des notifications:', error);
        res.status(500).send('Erreur du serveur lors de la récupération des notifications.');
    }
});

router.post('/', async (req, res) => {
    const { userId, type, details, productId } = req.body;
    try {
        const query = `
            INSERT INTO Notifications (UserID, Type, Details, DateCreated, ReadStatus, ProductID)
            VALUES ($1, $2, $3, NOW(), 0, $4)
            RETURNING *;
        `;
        const newNotification = await pool.query(query, [userId, type, details, productId]);
        res.status(201).json(newNotification.rows[0]);
    } catch (error) {
        console.error('Erreur lors de l\'ajout d\'une notification:', error);
        res.status(500).send('Erreur du serveur lors de l\'ajout d\'une notification.');
    }
});

// Dans votre fichier routes (par exemple, notificationsRoutes.js)

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query('SELECT * FROM notifications WHERE UserId = $1', [userId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur du serveur lors de la récupération des notifications.");
  }
});

// Marquer une notification spécifique comme lue
router.post('/markAsRead/:notificationId', async (req, res) => {
  const { notificationId } = req.params; // Obtenez l'ID de la notification depuis l'URL
  try {
    // Mettre à jour le statut de lecture d'une notification spécifique
    const result = await pool.query('UPDATE notifications SET ReadStatus = 1 WHERE NotificationID = $1 RETURNING *;', [notificationId]);
    res.json(result.rows[0]); // Retournez la notification mise à jour
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur du serveur lors de la mise à jour de la notification.");
  }
});


router.post('/notifyNewProduct', async (req, res) => {
    // Extraire newProductId et brandId du corps de la requête
    let { newProductId, brandId } = req.body;

    // Log pour débogage
    console.log('newProductId avant conversion:', newProductId, 'Type:', typeof newProductId);
    console.log('brandId avant conversion:', brandId, 'Type:', typeof brandId);

    // Convertir en entiers si nécessaire
    newProductId = parseInt(newProductId, 10);
    brandId = parseInt(brandId, 10);

    // Vérification après conversion
    console.log('newProductId après conversion:', newProductId, 'Type:', typeof newProductId);
    console.log('brandId après conversion:', brandId, 'Type:', typeof brandId);

    try {
        const query = `
            INSERT INTO Notifications (UserID, Type, Details, DateCreated, ReadStatus, ProductID)
            SELECT DISTINCT f.UserID, 'NewProduct', 'Un nouveau produit est disponible dans votre marque favorite.', NOW(), 0, $1::integer
            FROM Favorites f
            INNER JOIN Products p ON f.ProductID = p.ProductID
            WHERE p.BrandID = $2::integer
        `;
        await pool.query(query, [newProductId, brandId]);
        console.log('Notifications have been created and response sent.');
        res.status(200).json({ message: 'Notifications created for users who favorited this brand with the new product.' });
    } catch (error) {
        console.error('Failed to create notifications for users:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Failed to create notifications for users' });
        }
    }
});


module.exports = router;