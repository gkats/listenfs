import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { play, pause } from './actions';
import css from './Player.css';
import AudioPlayer from '../Audio/Audio';
import Link from '../Link/Link';

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
    window.document.addEventListener('keypress', this.keyPressed);
  }

  componentWillUnmount() {
    window.document.removeEventListener('keypress', this.keyPressed);
  }

  keyPressed(e) {
    if (e.key === 32 || e.keyCode === 32) {
      e.preventDefault();
      this.play();
    }
  }

  playClicked(e) {
    e.preventDefault();
    this.play();
  }

  prevClicked(e) {
    e.preventDefault();
    const currentIndex = this.getCurrentSongIndex();
    if (currentIndex > 0) {
      this.props.play(this.props.songs[currentIndex - 1]);
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

  play() {
    if (this.props.isPlaying) {
      this.props.pause();
    } else {
      this.props.play(this.props.currentSong || this.props.songs[0]);
    }
  }

  next() {
    const currentIndex = this.getCurrentSongIndex();
    if (currentIndex < this.props.songs.length - 1) {
      this.props.play(this.props.songs[currentIndex + 1]);
    }
  }

  getCurrentSongIndex() {
    return this.props.songs.indexOf(this.props.currentSong);
  }

  render() {
    const progressBarWidth = this.state.currentTime * 100 / this.state.duration;
    const { artistName, cover } = this.props.album;

    return (
      <div class={css.playerContainer}>
        <div class={css.player}>
          <div class={css.mediaInfoContainer}>
            {this.props.currentSong ? (
              <div class={css.mediaInfo}>
                <div class={css.mediaInfoCoverContainer}>
                  {cover ? (
                    <img src={cover} />
                  ) : (
                    <div class={css.mediaInfoCover}>
                      <Link
                        href={`#/albums/${artistName}/${
                          this.props.album.filename
                        }`}
                        relative={true}
                      >
                        <i class="fas fa-dot-circle" />
                      </Link>
                    </div>
                  )}
                </div>
                <div>
                  <div class={css.mediaInfoSongTitle}>
                    <Link
                      href={`#/albums/${artistName}/${
                        this.props.album.filename
                      }`}
                      relative={true}
                    >
                      {this.props.currentSong.title}
                    </Link>
                  </div>
                  <div class={css.mediaInfoArtistName}>
                    <Link href={`#/artists/${artistName}`} relative={true}>
                      {artistName}
                    </Link>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div class={css.controls}>
            <div class={css.controlsButtons}>
              <button
                class={getControlClassName(!this.props.currentSong)}
                onClick={this.prevClicked}
                disabled={!this.props.currentSong}
              >
                <i class="fas fa-step-backward" />
              </button>
              <button class={css.controlPlay} onClick={this.playClicked}>
                <icon
                  class={this.props.isPlaying ? 'fas fa-pause' : 'fas fa-play'}
                />
              </button>
              <button
                class={getControlClassName(!this.props.currentSong)}
                onClick={this.nextClicked}
                disabled={!this.props.currentSong}
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
            this.props.currentSong
              ? `${this.props.spaHost}/${this.props.currentSong.location}`
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
  songs: (albums.album || {}).songs || [],
  currentSong: player.currentSong,
  album: albums.album || {},
  isPlaying: player.isPlaying,
  spaHost: config.spaHost
});

export default connect(mapStateToProps, { play, pause })(Player);
