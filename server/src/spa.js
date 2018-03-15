const express = require('express');
const fs = require('fs');
const path = require('path');

const rootPath = process.env.ROOT_PATH;

const router = express.Router();

const isDirectory = file => fs.statSync(file).isDirectory();

router.get('/artists', (req, res, next) => {
  fs.readdir(rootPath, (err, files) => {
    if (err) {
      next(err);
      return;
    }
    res.json(files.filter(f => isDirectory(path.join(rootPath, f))));
  });
});

module.exports = router;