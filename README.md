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

## Deployment

1. Install [nginx](https://www.nginx.com/). Make sure it starts whenever you boot into your OS.
2. Install [pm2](https://pm2.keymetrics.io/). `$ npm install pm2 -g`
3. Run `$ npm run config` to generate the configuration files for nginx (`listenfs.conf`) and pm2 (`process.config.js`). Make sure you set environment variables accordingly. An example run would be:
```
$ MUSIC_PATH=/path/to/music npm run config
```
4. Copy the nginx configuration file (`listenfs.conf`) to the directory with your nginx configurations. Usually this is `/etc/nginx/conf.d`. Reload nginx.
5. Build the front-end app bundle. Run `$ cd frontend/ && SPA_HOST=https://server-url npm run build`.
6. Start the back-end server. This needs to run only for cold deployments. Run `$ pm2 start process.config.js`. Save a dump for pm2 with `$ pm2 save`.
7. Run `$ pm2 startup systemd` to have your app started on boot. This will generate a service file in `/etc/systemd/system/pm2-user.service`. Feel free to rename the file to `listenfs.service` and edit the description or other fields as you see fit. The server will now run on each boot.

