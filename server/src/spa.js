const express = require('express');
const fs = require('fs');
const path = require('path');

const rootPath = process.env.ROOT_PATH;

const router = express.Router();

const isDirectory = file => fs.statSync(file).isDirectory();

const isMp3 = file => fs.statSync(file).isFile() && file.endsWith('.mp3');

router.get('/artists', (req, res, next) => {
  fs.readdir(rootPath, (err, files) => {
    if (err) {
      next(err);
      return;
    }
    res.json(files.filter(f => isDirectory(path.join(rootPath, f))));
  });
});

router.get('/artists/:name', (req, res, next) => {
  fs.readdir(path.join(rootPath, req.params.name), (err, files) => {
    if (err) {
      next(err);
      return;
    }
    res.json(
      files.filter(f => isDirectory(path.join(rootPath, req.params.name, f)))
    );
  });
});

module.exports = router;
