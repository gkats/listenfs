import './reset.css';
import { h, render } from 'preact';
import { withStore, configureStore } from './store';
import App from './App/App';

const AppWithStore = withStore(configureStore())(App);

const renderApp = path => {
  render(
    <AppWithStore path={path} />,
    document.body,
    document.getElementById('app')
  );
};

// Initial render
renderApp(window.location.hash);

// Listen for pathname changes
window.addEventListener('popstate', e => {
  renderApp(window.location.hash);
});
