import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { show } from './actions';
import { play } from '../Player/actions';
import Loader from '../Loader/Loader';
import Link from '../Link/Link';
import css from './Albums.css';

const isTrackSelected = (selectedTrack, track) =>
  selectedTrack && selectedTrack.id === track.id;

const getTrackListItemClassName = (selectedTrack, track) =>
  `${css.trackListItem} ${
    isTrackSelected(selectedTrack, track) ? css.trackListItemSelected : ''
  }`;

class Album extends Component {
  componentDidMount() {
    const { artistName, albumName } = this.props.route;
    this.props.show({ artistName, albumName });
  }

  trackClicked(track) {
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
                <span class={css.text}>by</span>&nbsp;
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
              {this.props.tracks.map(s => (
                <div
                  key={s.id}
                  onClick={this.trackClicked.bind(this, s)}
                  class={getTrackListItemClassName(this.props.currentTrack, s)}
                >
                  <div class={css.trackIcon}>
                    {isTrackSelected(this.props.currentTrack, s) ? (
                      <i class="fas fa-play" />
                    ) : null}
                  </div>
                  <div class={css.trackNumber}>
                    {s.number ? `${parseInt(s.number, 10)}.` : '-'}
                  </div>
                  <div class={css.trackTitle}>{s.title}</div>
                </div>
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
  tracks: (albums.album || {}).tracks || [],
  currentTrack: player.currentTrack
});

export default connect(mapStateToProps, { show, play })(Album);
