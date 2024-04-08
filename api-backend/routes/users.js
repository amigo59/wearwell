//users.js
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

// Méthode GET pour récupérer tous les users
router.get('/', async (req, res) => {
  try {
    // Exécutez la requête pour sélectionner tous les éléments dans la table 'Products'
    const allUsers = await pool.query("SELECT * FROM Users");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur lors de la récupération des users.");
  }
});

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Remplacez cette requête par votre logique d'authentification réelle
    const queryText = 'SELECT * FROM Users WHERE Email = $1 AND PasswordHash = $2';
    const result = await pool.query(queryText, [email, password]);

    if (result.rows.length > 0) {
      const user = result.rows[0]; // Prend le premier utilisateur correspondant
      // Authentification réussie
      res.json({
        success: true,
        user: {
          userID: user.userid, // Assurez-vous que le champ est correctement nommé dans votre DB
          email: user.email,
          // Ajoutez ici d'autres champs souhaités de l'objet utilisateur
        },
      });
    } else {
      // Authentification échouée
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Route pour récupérer les données d'un utilisateur par son ID
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const query = 'SELECT * FROM Users WHERE userid = $1';
    const { rows } = await pool.query(query, [userId]);

    if (rows.length > 0) {
      const user = rows[0];
      // Mappage des données de l'utilisateur pour modifier la casse et le nom des clés
      const mappedUser = {
        UserID: user.userid,
        Name: user.name,
        Surname: user.surname,
        Email: user.email,
        PasswordHash: user.passwordhash,
        RegistrationDate: user.registrationdate,
        ProfilePictureURL: user.profilepictureurl,
        Age: user.age,
        Location: user.location,
        Phone: user.phone,
        Gender: user.gender,
        Style: user.style,
      };
      res.json(mappedUser);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error while retrieving user data');
  }
});


// Route pour mettre à jour les données d'un utilisateur
router.put('/:userId', async (req, res) => {
  const { userId } = req.params;
  const updates = req.body; // Contient les données de mise à jour

  let query = 'UPDATE Users SET ';
  const values = [];
  let counter = 1;

  // Construire dynamiquement la requête en fonction des champs fournis
  for (const [key, value] of Object.entries(updates)) {
    query += `${key} = $${counter}, `;
    values.push(value);
    counter++;
  }

  // Enlever la dernière virgule et espace
  query = query.slice(0, -2);

  query += ` WHERE userid = $${counter} RETURNING *`;
  values.push(userId);

  try {
    const { rows } = await pool.query(query, values);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).send("User not found.");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.put('/:userId/changePassword', async (req, res) => {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;

    // Recherche de l'utilisateur et de son mot de passe actuel
    const user = await pool.query('SELECT passwordhash FROM users WHERE userid = $1', [userId]);

    if (user.rowCount === 0) {
        return res.status(404).send('User not found');
    }

    // Comparez l'ancien mot de passe avec celui enregistré dans la base de données
    // Attention : Cette méthode est fortement déconseillée pour la gestion des mots de passe en production !
    if (oldPassword !== user.rows[0].passwordhash) {
        return res.status(401).send('Old password is incorrect');
    }

    // Mise à jour du mot de passe de l'utilisateur avec le nouveau mot de passe
    // Dans un scénario réel, assurez-vous de hacher le nouveau mot de passe avant de le stocker
    await pool.query('UPDATE users SET passwordhash = $1 WHERE userid = $2', [newPassword, userId]);

    res.send('Password updated successfully');
});





module.exports = router;
