const path = require('path');
const crypto = require('crypto');

const songFromFile = (file, parentFolder) => {
  const songMatches = file.match(/^\d{2}/);
  const location = path.join(parentFolder, file);

  return {
    id: crypto
      .createHash('md5')
      .update(location)
      .digest('hex'),
    number: songMatches ? songMatches[0] : '',
    title: file.replace('.mp3', '').replace(/^\d{2}\.\s/, ''),
    location
  };
};

module.exports = {
  songFromFile
};
