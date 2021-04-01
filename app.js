const express = require('express');
require('dotenv').config();
const path = require('path');
const app = express();

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'app/build/index.html'));
});

app.use(express.static(path.join(__dirname, 'app/build')));

app.listen(process.env.PORT ?? 3000);
