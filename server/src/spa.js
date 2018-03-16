const express = require('express');
const fs = require('fs');
const path = require('path');

const rootPath = process.env.ROOT_PATH;

const isDirectory = file => fs.statSync(file).isDirectory();

const isMp3 = file => fs.statSync(file).isFile() && file.endsWith('.mp3');

const router = express.Router();

router.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', -1);
  res.header('Pragma', 'no-cache');
  res.header('Content-Type', 'application/json');
  next();
});

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
    res.json(
      files.filter(f => isDirectory(path.join(artistPath, f))).map(f => {
        const yearMatches = f.match(/^\((\d+)\)/);

        return {
          title: f.replace(/\(.+\)\s/, ''),
          year: yearMatches ? yearMatches[1] : '',
          filename: f
        };
      })
    );
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
      files.filter(f => isMp3(path.join(albumPath, f))).map(f => {
        const trackMatches = f.match(/^\d{2}/);

        return {
          number: trackMatches ? trackMatches[0] : '',
          title: f.replace('.mp3', '').replace(/^\d{2}\.\s/, ''),
          location: path.join(req.params.artistName, req.params.albumName, f)
        };
      })
    );
  });
});

module.exports = router;
