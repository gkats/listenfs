import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { show } from './actions';
import {
  addTrack as addTrackToQueue,
  addAlbum as addAlbumToQueue
} from '../TrackQueue/actions';
import { play, loadTracks } from '../Player/actions';
import Loader from '../Loader/Loader';
import Link from '../Link/Link';
import TrackItem from '../TrackItem/TrackItem';
import css from './Albums.css';

class Album extends Component {
  constructor() {
    super();
    this.addAlbumToQueueClicked = this.addAlbumToQueueClicked.bind(this);
  }

  componentDidMount() {
    const { artistName, albumName } = this.props.route;
    this.props.show({ artistName, albumName });
  }

  trackClicked(track) {
    this.props.loadTracks(this.props.tracks);
    this.props.play(track);
  }

  addTrackToQueueClicked(track, e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.addTrackToQueue(track);
  }

  addAlbumToQueueClicked(e) {
    e.preventDefault();
    this.props.addAlbumToQueue(this.props.tracks);
  }

  renderAddToQueueButton(track) {
    return (
      <div>
        <a
          href="#"
          onClick={this.addTrackToQueueClicked.bind(this, track)}
          title="Add to queue"
          class={css.addTrack}
        >
          <i class="fas fa-plus" />
        </a>
      </div>
    );
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
          <div class={css.albumActionsContainer}>
            <div class={css.albumActions}>
              <div>
                <a
                  href="#"
                  class={css.addAlbum}
                  onClick={this.addAlbumToQueueClicked}
                >
                  <i class="fas fa-plus" />
                  &nbsp;Add album to queue
                </a>
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
                  trackActions={[this.renderAddToQueueButton(t)]}
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
  { show, addTrackToQueue, addAlbumToQueue, play, loadTracks }
)(Album);
