const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const YEAR_REGEX = /^\((\d+)_?\d?\)\s/;
const COVER_EXTENSIONS = ['png', 'PNG', 'jpg', 'JPG', 'jpeg', 'JPEG'];

const getAlbumCover = (root, relativeFolder, albumTitle) => {
  let cover = null;
  for (let filename of [
    'folder',
    'cover',
    albumTitle,
    `${albumTitle} (front)`
  ]) {
    for (let extension of COVER_EXTENSIONS) {
      cover = path.join(relativeFolder, `${filename}.${extension}`);
      if (fs.existsSync(path.join(root, cover))) {
        return cover;
      }
    }
  }
  return null;
};

const albumFromFolder = (folder, artistName, root) => {
  const yearMatches = folder.match(YEAR_REGEX);
  const title = folder.replace(YEAR_REGEX, '');

  return {
    id: crypto
      .createHash('md5')
      .update(folder)
      .digest('hex'),
    year: yearMatches ? yearMatches[1] : '',
    title,
    artist: {
      name: artistName
    },
    cover: getAlbumCover(root, path.join(artistName, folder), title),
    uri: folder
  };
};

module.exports = {
  albumFromFolder
};
