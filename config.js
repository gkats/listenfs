const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

const data = {
  PORT: process.env.PORT || 3000,
  SERVER_NAME: process.env.SERVER_NAME || 'listenfs.com',
  APP_PATH: process.env.APP_PATH || path.join(__dirname, 'public'),
  MUSIC_PATH: process.env.MUSIC_PATH
};

function writeFile(inName, outName) {
  ejs.renderFile(inName, data, {}, function(err, str) {
    if (err) {
      throw(err);
    }
    fs.writeFileSync(outName, str);
  });
  console.log('=> Written ' + outName);
}

writeFile('process.config.ejs', 'process.config.js');
writeFile('nginx.conf.ejs', 'nginx.conf');
