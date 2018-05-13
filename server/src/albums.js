const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const YEAR_REGEX = /^\((\d+)_?\d?\)\s/;

const getAlbumCover = (relativeFolder, root) => {
  let cover = null;
  for (let filename of ['folder', 'cover']) {
    for (let extension of ['png', 'jpg', 'jpeg']) {
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

  return {
    id: crypto
      .createHash('md5')
      .update(folder)
      .digest('hex'),
    title: folder.replace(YEAR_REGEX, ''),
    year: yearMatches ? yearMatches[1] : '',
    artist: {
      name: artistName
    },
    cover: getAlbumCover(path.join(artistName, folder), root),
    uri: folder
  };
};

module.exports = {
  albumFromFolder
};
