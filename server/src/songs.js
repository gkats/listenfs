const path = require('path');

const songFromFile = (file, parentFolder) => {
  const songMatches = file.match(/^\d{2}/);

  return {
    number: songMatches ? songMatches[0] : '',
    title: file.replace('.mp3', '').replace(/^\d{2}\.\s/, ''),
    location: path.join(parentFolder, file)
  };
};

module.exports = {
  songFromFile
};
