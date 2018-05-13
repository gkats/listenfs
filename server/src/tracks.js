const path = require('path');
const crypto = require('crypto');

const NUMBER_REGEX = /^(\d{2,})\.\s/;

const composeTrackJson = (trackJson, albumJson, artistJson) =>
  Object.assign({}, trackJson, { album: albumJson, artist: artistJson });

const trackFromFile = (file, parentFolder) => {
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

const removeExtension = track => track.replace('.mp3', '');

const removeNumber = track => track.replace(NUMBER_REGEX, '');

module.exports = {
  trackFromFile,
  composeTrackJson
};
