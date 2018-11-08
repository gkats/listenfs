import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { play, loadTracks } from '../Player/actions';
import { removeTrack } from './actions';
import TrackItem from '../TrackItem/TrackItem';
import css from './TrackQueue.css';

class TrackQueue extends Component {
  trackClicked(track) {
    this.props.loadTracks(this.props.tracks);
    this.props.play(track);
  }

  removeClicked(track, e) {
    e.stopPropagation();
    this.props.removeTrack(track);
  }

  renderRemoveButton(track) {
    return (
      <div
        onClick={this.removeClicked.bind(this, track)}
        title="Remove from queue"
      >
        <i class="fa fa-times" />
      </div>
    );
  }

  render() {
    return (
      <div class={css.wrapper}>
        <div class={css.header}>
          <div class={css.title}>Playlist</div>
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
  { play, loadTracks, removeTrack }
)(TrackQueue);
