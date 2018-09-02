import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { play, pause } from './actions';
import MediaInfo from './MediaInfo';
import AudioPlayer from '../Audio/Audio';

import css from './Player.css';

const getControlClassName = isDisabled =>
  `${css.control} ${isDisabled ? css.controlDisabled : ''}`;

const formatTime = t => {
  if (!t) {
    t = 0;
  }
  return `${Math.floor(t / 60)}:${('0' + Math.floor(t % 60)).slice(-2)}`;
};

const trackChanged = (newTrack, oldTrack) =>
  newTrack && (!oldTrack || newTrack.id !== oldTrack.id);

const setWindowTitle = track => {
  const windowTitle = window.document.getElementsByTagName('title')[0];
  if (windowTitle) {
    windowTitle.innerHTML = `${track.title} - ${track.artist.name}`;
  }
};

class Player extends Component {
  constructor() {
    super();
    this.keyPressed = this.keyPressed.bind(this);
    this.playClicked = this.playClicked.bind(this);
    this.prevClicked = this.prevClicked.bind(this);
    this.nextClicked = this.nextClicked.bind(this);
    this.timeChanged = this.timeChanged.bind(this);
    this.metadataLoaded = this.metadataLoaded.bind(this);
    this.seekClicked = this.seekClicked.bind(this);
    this.next = this.next.bind(this);
    this.state = {
      currentTime: 0,
      duration: 0,
      seekTo: 0
    };
  }

  componentDidMount() {
    window.document.addEventListener('keydown', this.keyPressed);
  }

  componentWillReceiveProps(nextProps) {
    if (trackChanged(nextProps.currentTrack, this.props.currentTrack)) {
      setWindowTitle(nextProps.currentTrack);
    }
  }

  componentWillUnmount() {
    window.document.removeEventListener('keydown', this.keyPressed);
  }

  keyPressed(e) {
    if (e.key === 32 || e.keyCode === 32) {
      e.preventDefault();
      this.play();
    }
  }

  playClicked(e) {
    e.preventDefault();
    e.stopPropagation();
    this.play();
  }

  prevClicked(e) {
    e.preventDefault();
    const currentIndex = this.getCurrentTrackIndex();
    if (currentIndex > 0) {
      this.props.play(this.getTrackList()[currentIndex - 1]);
    }
  }

  nextClicked(e) {
    e.preventDefault();
    this.next();
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

  getTrackList() {
    return this.props.tracks.length
      ? this.props.tracks
      : this.props.albumTracks;
  }

  play() {
    if (this.props.isPlaying) {
      this.props.pause();
    } else {
      this.props.play(this.props.currentTrack || this.getTrackList()[0]);
    }
  }

  next() {
    const currentIndex = this.getCurrentTrackIndex();
    if (currentIndex < this.getTrackList().length - 1) {
      this.props.play(this.getTrackList()[currentIndex + 1]);
    }
  }

  getCurrentTrackIndex() {
    return this.getTrackList().indexOf(this.props.currentTrack);
  }

  render() {
    const progressBarWidth =
      (this.state.currentTime * 100) / this.state.duration;

    return (
      <div class={css.playerContainer}>
        <div class={css.player}>
          <div class={css.mediaInfoContainer}>
            {this.props.currentTrack ? (
              <MediaInfo {...this.props.currentTrack} />
            ) : null}
          </div>
          <div class={css.controls}>
            <div class={css.controlsButtons}>
              <button
                class={getControlClassName(!this.props.currentTrack)}
                onClick={this.prevClicked}
                disabled={!this.props.currentTrack}
              >
                <i class="fas fa-step-backward" />
              </button>
              <button class={css.controlPlay} onClick={this.playClicked}>
                <icon
                  class={this.props.isPlaying ? 'fas fa-pause' : 'fas fa-play'}
                />
              </button>
              <button
                class={getControlClassName(!this.props.currentTrack)}
                onClick={this.nextClicked}
                disabled={!this.props.currentTrack}
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
          <div class={css.actions} />
        </div>

        <AudioPlayer
          src={
            this.props.currentTrack
              ? `${this.props.spaHost}/${this.props.currentTrack.uri}`
              : null
          }
          isPlaying={this.props.isPlaying}
          seekTo={this.state.seekTo}
          onEnd={this.next}
          onTimeUpdate={this.timeChanged}
          onMetadataLoaded={this.metadataLoaded}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ player, albums, config }) => ({
  tracks: player.tracks || [],
  albumTracks: (albums.album || {}).tracks || [],
  currentTrack: player.currentTrack,
  isPlaying: player.isPlaying,
  spaHost: config.spaHost
});

export default connect(
  mapStateToProps,
  { play, pause }
)(Player);
