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
  const artistPath = path.join(rootPath, req.params.name);
  fs.readdir(artistPath, (err, files) => {
    if (err) {
      next(err);
      return;
    }
    res.json(files.filter(f => isDirectory(path.join(artistPath, f))));
  });
});

router.get('/albums/:artistName/:albumName', (req, res, next) => {
  const albumPath = path.join(
    rootPath,
    req.params.artistName,
    req.params.albumName
  );
  fs.readdir(albumPath, (err, files) => {
    if (err) {
      next(err);
      return;
    }
    res.json(
      files.filter(f => isMp3(path.join(albumPath, f))).map(f => ({
        name: f.replace('.mp3', ''),
        location: path.join(req.params.artistName, req.params.albumName, f)
      }))
    );
  });
});

module.exports = router;
