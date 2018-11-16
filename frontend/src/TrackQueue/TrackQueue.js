import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { play, loadTracks } from '../Player/actions';
import { removeTrack, clear } from './actions';
import TrackItem from '../TrackItem/TrackItem';
import css from './TrackQueue.css';

class TrackQueue extends Component {
  constructor() {
    super();
    this.clearClicked = this.clearClicked.bind(this);
  }

  clearClicked(e) {
    e.preventDefault();
    this.props.clear();
  }

  trackClicked(track) {
    this.props.loadTracks(this.props.tracks);
    this.props.play(track);
  }

  removeClicked(track, e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.removeTrack(track);
  }

  renderRemoveButton(track) {
    return (
      <div>
        <a
          href="#"
          onClick={this.removeClicked.bind(this, track)}
          title="Remove from queue"
          class={css.removeTrack}
        >
          <i class="fa fa-times" />
        </a>
      </div>
    );
  }

  render() {
    return (
      <div class={css.wrapper}>
        <div class={css.header}>
          <div class={css.title}>Playlist</div>
          <div class={css.headerActions}>
            <div>
              <a href="#" onClick={this.clearClicked} class={css.clearQueue}>
                <i class="fas fa-times" />
                &nbsp;Clear queue
              </a>
            </div>
          </div>
        </div>
        {this.props.tracks.length ? (
          <div>
            <div class={css.trackList}>
              {this.props.tracks.map((t, index) => (
                <TrackItem
                  track={t}
                  onClick={this.trackClicked.bind(this, t)}
                  trackIndex={index + 1}
                  trackActions={[this.renderRemoveButton(t)]}
                />
              ))}
            </div>
          </div>
        ) : (
          <div class={css.noneFound}>
            Queue is empty. Add some tracks and come back.
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ trackQueue }) => ({
  tracks: Object.values(trackQueue.tracks || {})
});

export default connect(
  mapStateToProps,
  { play, loadTracks, removeTrack, clear }
)(TrackQueue);
