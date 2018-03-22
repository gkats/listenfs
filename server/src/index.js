const path = require('path');
const express = require('express');
const helmet = require('helmet');
const spa = require('./spa');
const errors = require('./errors');

const staticPath = path.join(__dirname, '../../public');
const PORT = process.env.PORT || 3000;

const app = express();
app.disable('x-powered-by');

const helmetOptions =
  app.get('env') === 'production'
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

// Add an extra layer of error handling in development
if (app.get('env') === 'development') {
  app.use(errors.devHandler);
}
app.use(errors.handler);

app.listen(PORT, () => console.log('Server listening on port 3000.'));
