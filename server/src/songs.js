const path = require('path');
const crypto = require('crypto');

const NUMBER_REGEX = /^(\d{2,})\.\s/;

const songFromFile = (file, parentFolder) => {
  const numberMatches = file.match(NUMBER_REGEX);
  const location = path.join(parentFolder, file);

  return {
    id: crypto
      .createHash('md5')
      .update(location)
      .digest('hex'),
    number: numberMatches ? numberMatches[1] : '',
    title: removeNumber(removeExtension(file)),
    location
  };
};

const removeExtension = song => song.replace('.mp3', '');

const removeNumber = song => song.replace(NUMBER_REGEX, '');

module.exports = {
  songFromFile
};
