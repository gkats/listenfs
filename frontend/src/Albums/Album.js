import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { show } from './actions';
import Player from '../Player/Player';
import Loader from '../Loader/Loader';
import Link from '../Link/Link';
import css from './Albums.css';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      currentTrack: null
    };
  }

  componentDidMount() {
    const { artistName, albumName } = this.props.route;
    this.props.show({ artistName, albumName });
  }

  trackClicked(track) {
    this.setState({ currentTrack: track.location });
  }

  render() {
    const { artistName, albumName } = this.props.route;
    const albumYearMatches = albumName.match(/^\((\d{4})\)/);

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
              &sdot;
              {this.props.tracks.length} songs
            </div>
          </div>
          <div class={css.actions}>
            <button class={css.playBtn}>Play</button>
          </div>
        </div>
        {this.props.isLoading ? (
          <Loader visible={this.props.isLoading} />
        ) : this.props.tracks.length ? (
          <div>
            <div class={css.trackList}>
              {this.props.tracks.map(t => (
                <div
                  key={t.title}
                  onClick={this.trackClicked.bind(this, t)}
                  class={css.trackListItem}
                >
                  <div class={css.trackNumber}>
                    {t.number ? `${parseInt(t.number, 10)}.` : '-'}
                  </div>
                  <div class={css.trackTitle}>{t.title}</div>
                </div>
              ))}
            </div>
            <div class={css.player}>
              <Player
                src={
                  this.state.currentTrack
                    ? `${this.props.spaHost}/tracks/${this.state.currentTrack}`
                    : null
                }
              />
            </div>
          </div>
        ) : (
          <div>No tracks found.</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ albums, config }) => ({
  isLoading: albums.isLoading,
  tracks: albums.tracks,
  spaHost: config.spaHost
});

export default connect(mapStateToProps, { show })(Album);
