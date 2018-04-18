import { h, Component } from 'preact';
import router from '../router';
import css from './App.css';
import Link from '../Link/Link';
import Player from '../Player/Player';

const App = ({ path }) => {
  const { Component, props } = router(path);

  return (
    <div class={css.wrapper}>
      <div class={css.container}>
        <div class={css.menu}>
          <Link href={'#'} relative={true}>
            <i class="fas fa-home" />
          </Link>
        </div>
        <Component {...props} />
        <div class={css.playerContainer}>
          <div class={css.player}>
            <Player />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
