# ListenFS

## Configuration

__Environment variables__

Name | Description
---- | ------------
__MUSIC_PATH__ | The full path to the directory which contains all the music files.
__SPA_HOST__ | The URL the server is listening on. Used by the front-end for all "api" calls. Defaults to "http://localhost:3000".

## Frontend

The front-end code is under the `frontend/` directory. The project is built with webpack. There is a base webpack configuration (`webpack.common.js`) and two different configurations for the "development" and "production" webpack modes (`webpack.dev.js` and `webpack.prod.js`).

The generated files will be placed under `public/assets`.

Both configurations use the html-webpack-plugin to automatically create an `index.html` file in the project's `public/` folder. The index file acts as the root file that is served by the back-end. If you want to make change to the index file, use the template `src/index.ejs`.

__Development__

In order to build the front-end code for development run

```
$ npm run dev
```

The CSS will be included in the javascript bundle.

__Production__

The production build creates separate Javascript and CSS assets. Run:

```
$ npm run build
```

## Back-end

The back-end code is under the `server/` directory.

__Development__

```
$ npm run dev
```

This script starts the app via nodemon so everytime a file changes the server reloads. The nodemon process also watches the `public/` folder, so when the front-end scripts change the server is restarted again.

__Production__

```
$ npm start
```

When in production we have strict security policies for javascript execution and CSS loading.