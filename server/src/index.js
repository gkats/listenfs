const path = require('path');
const express = require('express');
const spa = require('./spa');

const rootPath = process.env.ROOT_PATH;

const app = express();

app.use(express.static(path.join(__dirname, '../../public')));

app.use('/spa', spa);

app.listen(3000, () => console.log('Server listening on port 3000.'));