//Server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const productRoutes = require('./routes/products'); // Importez les routes des produits
const historyRoutes = require('./routes/productHistory');
const userRoutes = require('./routes/users');
const notificationsRoutes = require('./routes/notifications');
const favoritesRoutes = require('./routes/favorites');
const reviewsRoutes = require('./routes/reviews');

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json()); // Pour parser les requêtes JSON

app.use('/products', productRoutes); // Utilisez les routes des produits
app.use('/productHistory', historyRoutes); // Utilisez les routes des produits
app.use('/users', userRoutes); // Utilisez les routes des users
app.use('/notifications', notificationsRoutes);
app.use('/favorites', favoritesRoutes); // Utilisez les routes des favories
app.use('/reviews', reviewsRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
