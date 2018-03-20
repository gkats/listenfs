import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { show } from './actions';
import Player from '../Player/Player';
import Loader from '../Loader/Loader';
import Link from '../Link/Link';
import css from './Albums.css';

const getSongListItemClassName = (selectedSong, song) =>
  `${css.songListItem} ${
    selectedSong && selectedSong.id === song.id ? css.songListItemSelected : ''
  }`;

class Album extends Component {
  constructor() {
    super();
    this.state = {
      currentSong: null,
      isPlaying: false
    };
    this.playClicked = this.playClicked.bind(this);
    this.prevClicked = this.prevClicked.bind(this);
    this.nextClicked = this.nextClicked.bind(this);
  }

  componentDidMount() {
    const { artistName, albumName } = this.props.route;
    this.props.show({ artistName, albumName });
  }

  songClicked(song) {
    this.setState({
      currentSong: song,
      isPlaying: true
    });
  }

  prevClicked() {
    const currentIndex = this.getCurrentSongIndex();
    if (currentIndex > 0) {
      this.setState({ currentSong: this.props.songs[currentIndex - 1] });
    }
  }

  nextClicked() {
    const currentIndex = this.getCurrentSongIndex();
    if (currentIndex < this.props.songs.length - 1) {
      this.setState({ currentSong: this.props.songs[currentIndex + 1] });
    }
  }

  playClicked() {
    this.setState(state => ({
      isPlaying: !state.isPlaying,
      currentSong: state.currentSong || this.props.songs[0]
    }));
  }

  getCurrentSongIndex() {
    return this.props.songs.indexOf(this.state.currentSong);
  }

  render() {
    const { artistName, albumName } = this.props.route;
    const albumYearMatches = albumName.match(/^\((\d{4})_?\d?\)/);

    return (
      <div class={css.wrapper}>
        <div class={css.banner}>
          <div class={css.mediaInfo}>
            <div class={css.mediaTitle}>
              {albumName.replace(/^\(.+\)\s/, '')}
            </div>
            <div>
              <span class={css.text}>by</span>&nbsp;
              <Link href={`#/artists/${artistName}`} relative={true}>
                {artistName}
              </Link>
            </div>
            <div class={css.mediaDetails}>
              {albumYearMatches ? albumYearMatches[1] : ''}
              &nbsp; &bull; &nbsp;
              {this.props.songs.length} songs
            </div>
          </div>
        </div>
        {this.props.isLoading ? (
          <Loader visible={this.props.isLoading} />
        ) : this.props.songs.length ? (
          <div>
            <div class={css.songList}>
              {this.props.songs.map(s => (
                <div
                  key={s.id}
                  onClick={this.songClicked.bind(this, s)}
                  class={getSongListItemClassName(this.state.currentSong, s)}
                >
                  <div class={css.songNumber}>
                    {s.number ? `${parseInt(s.number, 10)}.` : '-'}
                  </div>
                  <div class={css.songTitle}>{s.title}</div>
                </div>
              ))}
            </div>
            <div class={css.playerContainer}>
              <div class={css.player}>
                <Player
                  src={
                    this.state.currentSong
                      ? `${this.props.spaHost}/${
                          this.state.currentSong.location
                        }`
                      : null
                  }
                  onPrev={this.prevClicked}
                  onNext={this.nextClicked}
                  onPlay={this.playClicked}
                  isPrevDisabled={!this.state.currentSong}
                  isNextDisabled={!this.state.currentSong}
                  isPlaying={this.state.isPlaying}
                />
              </div>
            </div>
          </div>
        ) : (
          <div class={css.noneFound}>No songs found.</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ albums, config }) => ({
  isLoading: albums.isLoading,
  songs: albums.songs,
  spaHost: config.spaHost
});

export default connect(mapStateToProps, { show })(Album);
