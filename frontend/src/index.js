import './reset.css';
import { h, render } from 'preact';
import { withStore, configureStore } from './store';
import App from './App/App';

const AppWithStore = withStore(configureStore())(App);

render(
  <AppWithStore />,
  document.body,
  document.getElementById('app')
);
