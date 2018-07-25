const express = require('express');
const fs = require('fs');
const path = require('path');
const { trackFromFile, composeTrackJson } = require('./tracks');
const albumFromFolder = require('./albums').albumFromFolder;

const musicPath = process.env.MUSIC_PATH;

const isDirectory = file => fs.statSync(file).isDirectory() && !isHidden(file);

const isHidden = file =>
  file
    .split(path.sep)
    .pop()
    .startsWith('.');

const isMp3 = file =>
  fs.statSync(file).isFile() && file.endsWith('.mp3') && !isHidden(file);

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
      files
        .filter(f => isDirectory(path.join(artistPath, f)))
        .map(f => albumFromFolder(f, req.params.name, musicPath))
    );
  });
});

router.get('/albums/:artistName/:albumTitle', (req, res, next) => {
  const { artistName, albumTitle } = req.params;
  const albumPath = path.join(musicPath, artistName, albumTitle);
  const albumInfo = albumFromFolder(albumTitle, artistName, musicPath);
  const artistInfo = { name: artistName };

  fs.readdir(albumPath, (err, files) => {
    if (err) {
      return next(err);
    }
    const discs = files.filter(f => isDirectory(path.join(albumPath, f)));

    if (discs.length) {
      tracksJson = discs.reduce(
        (tracks, disc) =>
          tracks.concat(
            fs
              .readdirSync(path.join(albumPath, disc))
              .filter(f => isMp3(path.join(albumPath, disc, f)))
              .map(f =>
                composeTrackJson(
                  trackFromFile(f, path.join(artistName, albumTitle, disc)),
                  albumInfo,
                  artistInfo
                )
              )
          ),
        []
      );
    } else {
      tracksJson = files
        .filter(f => isMp3(path.join(albumPath, f)))
        .map(f =>
          composeTrackJson(
            trackFromFile(f, path.join(artistName, albumTitle)),
            albumInfo,
            artistInfo
          )
        );
    }
    res.json(
      Object.assign({}, albumFromFolder(albumTitle, artistName, musicPath), {
        tracks: tracksJson
      })
    );
  });
});

module.exports = router;
