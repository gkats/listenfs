import { h } from 'preact';
import router from '../router';
import css from './App.css';

const App = ({ path }) => {
  const { Component, props } = router(path);

  return (
    <div class={css.wrapper}>
      <div class={css.container}>
        <Component {...props} />
      </div>
    </div>
  );
};

export default App;
