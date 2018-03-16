const path = require('path');
const express = require('express');
const helmet = require('helmet');
const spa = require('./spa');

const rootPath = process.env.ROOT_PATH;

const app = express();
app.disable('x-powered-by');

const helmetOptions =
  process.env.NODE_ENV === 'production'
    ? {
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", 'use.fontawesome.com', 'fonts.googleapis.com'],
            fontSrc: [
              'use.fontawesome.com',
              'fonts.googleapis.com',
              'fonts.gstatic.com'
            ]
          }
        }
      }
    : {};
app.use(helmet(helmetOptions));
app.use(express.static(path.join(__dirname, '../../public')));
app.use('/tracks', express.static(rootPath));
app.use('/spa', spa);

app.listen(3000, () => console.log('Server listening on port 3000.'));
