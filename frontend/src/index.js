import './reset.css';
import { h, render } from 'preact';
import App from './App/App';

render(
  <App root={process.env.ROOT_PATH} />,
  document.body,
  document.getElementById('app')
);
