import { h, Component } from 'preact';
import css from './Player.css';
import AudioPlayer from '../Audio/Audio';

const getControlClassName = isDisabled =>
  `${css.control} ${isDisabled ? css.controlDisabled : ''}`;

const formatTime = t => {
  if (!t) {
    t = 0;
  }
  return `${Math.floor(t / 60)}:${('0' + Math.floor(t % 60)).slice(-2)}`;
};

class Player extends Component {
  constructor() {
    super();
    this.playClicked = this.playClicked.bind(this);
    this.prevClicked = this.prevClicked.bind(this);
    this.nextClicked = this.nextClicked.bind(this);
    this.timeChanged = this.timeChanged.bind(this);
    this.metadataLoaded = this.metadataLoaded.bind(this);
    this.seekClicked = this.seekClicked.bind(this);
    this.state = {
      currentTime: 0,
      duration: 0,
      seekTo: 0
    };
  }

  playClicked(e) {
    e.preventDefault();
    this.props.onPlay();
  }

  prevClicked(e) {
    e.preventDefault();
    this.props.onPrev();
  }

  nextClicked(e) {
    e.preventDefault();
    this.props.onNext();
  }

  seekClicked(e) {
    e.preventDefault();
    this.setState({
      seekTo:
        (e.clientX - e.target.getBoundingClientRect().left) /
        e.target.clientWidth
    });
  }

  timeChanged(currentTime) {
    this.setState({ currentTime });
  }

  metadataLoaded({ duration }) {
    this.setState({ duration });
  }

  render() {
    const progressBarWidth = this.state.currentTime * 100 / this.state.duration;

    return (
      <div class={css.playerContainer}>
        <div class={css.player}>
          <div class={css.controls}>
            <div class={css.controlsButtons}>
              <button
                class={getControlClassName(this.props.isPrevDisabled)}
                onClick={this.prevClicked}
                disabled={this.props.isPrevDisabled}
              >
                <i class="fas fa-step-backward" />
              </button>
              <button class={css.controlPlay} onClick={this.playClicked}>
                <icon
                  class={this.props.isPlaying ? 'fas fa-pause' : 'fas fa-play'}
                />
              </button>
              <button
                class={getControlClassName(this.props.isNextDisabled)}
                onClick={this.nextClicked}
                disabled={this.props.isNextDisabled}
              >
                <i class="fas fa-step-forward" />
              </button>
            </div>
            <div class={css.progressContainer}>
              <div class={css.progress}>
                <div class={css.progressTime}>
                  {formatTime(this.state.currentTime)}
                </div>
                <div class={css.progressBar} onClick={this.seekClicked}>
                  <div class={css.progressBarBg}>
                    <div
                      class={css.progressBarFg}
                      style={{ width: `${progressBarWidth}%` }}
                    />
                  </div>
                </div>
                <div class={css.progressTime}>
                  {formatTime(this.state.duration)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <AudioPlayer
          src={this.props.src}
          isPlaying={this.props.isPlaying}
          seekTo={this.state.seekTo}
          onEnd={this.nextClicked}
          onTimeUpdate={this.timeChanged}
          onMetadataLoaded={this.metadataLoaded}
        />
      </div>
    );
  }
}

Player.defaultProps = {
  src: null,
  isPlaying: false,
  isPrevDisabled: false,
  isNextDisabled: false,
  onPrev: () => {},
  onNext: () => {},
  onPlay: () => {},
  onProgress: () => {}
};

export default Player;
