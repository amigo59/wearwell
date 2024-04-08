const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Méthode GET pour obtenir le nombre de reviews pour un produit spécifique
router.get('/:productId/reviewCount', async (req, res) => {
  const { productId } = req.params;
  try {
    const result = await pool.query('SELECT COUNT(*) AS ReviewCount FROM UserReviews WHERE ProductID = $1', [productId]);
    if (result.rows.length > 0) {
      const reviewCount = result.rows[0].reviewcount; // Assurez-vous que 'reviewcount' correspond au nom de la colonne retournée par votre requête SQL
      res.json({ ReviewCount: parseInt(reviewCount, 10) });
    } else {
      res.json({ ReviewCount: 0 }); // Retourne 0 s'il n'y a pas de reviews
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du nombre de reviews:', error);
    res.status(500).send("Erreur du serveur lors de la récupération du nombre de reviews.");
  }
});

router.get('/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
        const query = `
            SELECT u.Name, u.Location, r.Rating, r.ReviewText
            FROM UserReviews r
            JOIN Users u ON r.UserID = u.UserID
            WHERE r.ProductID = $1
        `;
        const { rows } = await pool.query(query, [productId]);
        const reviews = rows.map(row => ({

            Name: row.name,
            Location: row.location,
            Rating: row.rating,
            ReviewText: row.reviewtext,

        }));
        res.json(reviews); // Renvoie les avis sous forme de JSON, avec le mapping appliqué
    } catch (error) {
        console.error('Erreur lors de la récupération des avis pour le produit:', error);
        res.status(500).send('Erreur du serveur');
    }
});

router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
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
        const { rows } = await pool.query(query, [userId]);
        const reviews = rows.map(row => ({

            ReviewID: row.reviewid,
            Rating: row.rating,
            ReviewText: row.reviewtext,
            ReviewDate: row.reviewdate,
            ProductName: row.productname,
            ImageURL: row.imageurl,
        }));
        res.json(reviews); // Renvoie les avis sous forme de JSON, avec le mapping appliqué
    } catch (error) {
        console.error('Erreur lors de la récupération des avis pour le user:', error);
        res.status(500).send('Erreur du serveur');
    }
});


router.post('/addReview', async (req, res) => {
    const { userId, productId, rating, reviewText } = req.body;

    try {
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
            res.status(200).json({ message: 'Avis mis à jour avec succès' });
        } else {
            // Insertion d'un nouvel avis
            const insertQuery = `
                INSERT INTO UserReviews (UserID, ProductID, Rating, ReviewText, ReviewDate)
                VALUES ($1, $2, $3, $4, $5)
                ON CONFLICT (UserID, ProductID)
                DO UPDATE SET Rating = EXCLUDED.Rating, ReviewText = EXCLUDED.ReviewText, ReviewDate = EXCLUDED.ReviewDate;
            `;
            await pool.query(insertQuery, [userId, productId, parseFloat(rating), reviewText, reviewDate]);
            res.status(201).json({ message: 'Avis ajouté avec succès' });
        }
    } catch (error) {
        console.error('Erreur lors de l\'ajout ou de la mise à jour de l\'avis:', error);
        res.status(500).json({ message: 'Erreur lors de l\'ajout ou de la mise à jour de l\'avis' });
    }
});

router.put('/update/:reviewId', async (req, res) => {
    const { reviewId } = req.params;
    const { rating, reviewText } = req.body;

    try {
        const result = await pool.query(
            "UPDATE UserReviews SET Rating = $1, ReviewText = $2, ReviewDate = NOW() WHERE ReviewID = $3 RETURNING *",
            [rating, reviewText, reviewId]
        );

        if (result.rows.length > 0) {
            res.json({ message: "Review updated successfully", review: result.rows[0] });
        } else {
            res.status(404).json({ message: "Review not found" });
        }
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({ message: "Error updating review" });
    }
});

router.delete('/delete/:reviewId', async (req, res) => {
    const { reviewId } = req.params;

    try {
        const result = await pool.query(
            "DELETE FROM UserReviews WHERE ReviewID = $1 RETURNING *",
            [reviewId]
        );

        if (result.rows.length > 0) {
            res.json({ message: "Review deleted successfully" });
        } else {
            res.status(404).json({ message: "Review not found" });
        }
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ message: "Error deleting review" });
    }
});

module.exports = router;
