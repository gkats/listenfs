import { h } from 'preact';
import router from '../router';
import css from './App.css';
import Link from '../Link/Link';

const App = ({ path }) => {
  const { Component, props } = router(path);

  return (
    <div class={css.wrapper}>
      <div class={css.container}>
        <div class={css.menu}>
          <Link href="/">
            <i class="fas fa-home" />
          </Link>
        </div>
        <Component {...props} />
      </div>
    </div>
  );
};

export default App;
