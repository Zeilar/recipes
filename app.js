require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const recipesRoutes = require('./routes/recipeRoutes');

const app = express();
const PORT = process.env.PORT ?? 3000;

// Parse body middleware
app.use(express.json());

// CORS middleware
app.use(cors());

// Recipes controller routes
app.use('/api/recipes', recipesRoutes);

// Serve the app if nothing else to do
app.use(express.static(path.join(__dirname, 'build-ui')));

app.listen(PORT);
