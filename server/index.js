const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, '../public')));

const index = (req, res) => res.send('Hello from the server');

app.get('/', index);
app.listen(3000, () => console.log('Server listening on port 3000.'));
