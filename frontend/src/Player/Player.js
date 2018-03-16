import { h } from 'preact';
import css from './Player.css';

const Player = ({ src }) => (
  <div class={css.player}>
    <audio
      autoplay={true}
      controls={true}
      src={src}
      style={{ width: '100%' }}
    />
  </div>
);

Player.defaultProps = {
  src: null
};

export default Player;
