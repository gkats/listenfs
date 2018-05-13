const path = require('path');
const crypto = require('crypto');

const NUMBER_REGEX = /^(\d{2,})\.\s/;

const composeSongJson = (songJson, albumJson, artistJson) =>
  Object.assign({}, songJson, { album: albumJson, artist: artistJson });

const songFromFile = (file, parentFolder) => {
  const numberMatches = file.match(NUMBER_REGEX);
  const uri = path.join(parentFolder, file);

  return {
    id: crypto
      .createHash('md5')
      .update(uri)
      .digest('hex'),
    number: numberMatches ? numberMatches[1] : '',
    title: removeNumber(removeExtension(file)),
    uri
  };
};

const removeExtension = song => song.replace('.mp3', '');

const removeNumber = song => song.replace(NUMBER_REGEX, '');

module.exports = {
  songFromFile,
  composeSongJson
};
