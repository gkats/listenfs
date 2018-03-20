const express = require('express');
const fs = require('fs');
const path = require('path');
const songFromFile = require('./songs').songFromFile;

const musicPath = process.env.MUSIC_PATH;

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
  fs.readdir(musicPath, (err, files) => {
    if (err) {
      return next(err);
    }
    res.json(files.filter(f => isDirectory(path.join(musicPath, f))));
  });
});

router.get('/artists/:name', (req, res, next) => {
  const artistPath = path.join(musicPath, req.params.name);
  fs.readdir(artistPath, (err, files) => {
    if (err) {
      return next(err);
    }
    res.json(
      files.filter(f => isDirectory(path.join(artistPath, f))).map(f => {
        const yearMatches = f.match(/^\((\d+)_?\d?\)/);

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
  const { artistName, albumName } = req.params;
  const albumPath = path.join(musicPath, artistName, albumName);
  fs.readdir(albumPath, (err, files) => {
    if (err) {
      return next(err);
    }
    const discs = files.filter(f => isDirectory(path.join(albumPath, f)));
    if (discs.length) {
      res.json(
        discs.reduce(
          (songs, disc) =>
            songs.concat(
              fs
                .readdirSync(path.join(albumPath, disc))
                .filter(f => isMp3(path.join(albumPath, disc, f)))
                .map(f =>
                  songFromFile(f, path.join(artistName, albumName, disc))
                )
            ),
          []
        )
      );
    } else {
      res.json(
        files
          .filter(f => isMp3(path.join(albumPath, f)))
          .map(f => songFromFile(f, path.join(artistName, albumName)))
      );
    }
  });
});

module.exports = router;
