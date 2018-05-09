const path = require('path');
const crypto = require('crypto');

const YEAR_REGEX = /^\((\d+)_?\d?\)\s/;

const albumFromFolder = (folder, artistName) => {
  const yearMatches = folder.match(YEAR_REGEX);

  return {
    id: crypto
      .createHash('md5')
      .update(folder)
      .digest('hex'),
    title: folder.replace(YEAR_REGEX, ''),
    year: yearMatches ? yearMatches[1] : '',
    filename: folder,
    cover: null,
    artistName
  };
};

module.exports = {
  albumFromFolder
};
