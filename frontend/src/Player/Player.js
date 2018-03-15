import { h } from 'preact';

const Player = ({ src }) => (
  <div>
    <audio autoplay={true} controls={true} src={src} />
  </div>
);

Player.defaultProps = {
  src: null
};

export default Player;
