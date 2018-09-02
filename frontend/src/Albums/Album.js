import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { show } from './actions';
import { play, loadTracks } from '../Player/actions';
import Loader from '../Loader/Loader';
import Link from '../Link/Link';
import TrackItem from './TrackItem';
import css from './Albums.css';

class Album extends Component {
  componentDidMount() {
    const { artistName, albumName } = this.props.route;
    this.props.show({ artistName, albumName });
  }

  trackClicked(track) {
    this.props.loadTracks(this.props.tracks);
    this.props.play(track);
  }

  render() {
    const { artistName, albumName } = this.props.route;

    return (
      <div class={css.wrapper}>
        <div class={css.banner}>
          <div class={css.mediaInfo}>
            <div class={css.mediaCoverContainer}>
              {this.props.album.cover ? (
                <img width={100} height={100} src={this.props.album.cover} />
              ) : (
                <div class={css.mediaCover}>
                  <i class="fas fa-dot-circle" />
                </div>
              )}
            </div>
            <div>
              <div class={css.mediaTitle}>{this.props.album.title}</div>
              <div>
                <span class={css.text}>by</span>
                &nbsp;
                <Link href={`#/artists/${artistName}`} relative={true}>
                  {artistName}
                </Link>
              </div>
              <div class={css.mediaDetails}>
                {this.props.album.year}
                &nbsp; &bull; &nbsp;
                {this.props.tracks.length} tracks
              </div>
            </div>
          </div>
        </div>
        {this.props.isLoading ? (
          <Loader visible={this.props.isLoading} />
        ) : this.props.tracks.length ? (
          <div>
            <div class={css.trackList}>
              {this.props.tracks.map(t => (
                <TrackItem
                  track={t}
                  onClick={this.trackClicked.bind(this, t)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div class={css.noneFound}>No tracks found.</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ albums, player }) => ({
  isLoading: albums.isLoading,
  album: albums.album,
  tracks: (albums.album || {}).tracks || []
});

export default connect(
  mapStateToProps,
  { show, play, loadTracks }
)(Album);
