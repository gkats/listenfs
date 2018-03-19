const path = require('path');
const express = require('express');
const helmet = require('helmet');
const spa = require('./spa');

const staticPath = path.join(__dirname, '../../public');

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
app.use(express.static(staticPath));
app.use('/spa', spa);

app.listen(3000, () => console.log('Server listening on port 3000.'));
