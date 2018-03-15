import './reset.css';
import { h, render } from 'preact';
import { withStore, configureStore } from './store';
import App from './App/App';

const appEl = document.getElementById('app');

// SPA_HOST is set through webpack config
const persistedState = {
  config: {
    spaHost: SPA_HOST
  }
};
const AppWithStore = withStore(configureStore(persistedState))(App);

const renderApp = path => {
  render(<AppWithStore path={path} />, document.body, appEl);
};

// Initial render
renderApp(window.location.hash);

// Listen for pathname changes
window.addEventListener('popstate', e => {
  renderApp(window.location.hash);
});
