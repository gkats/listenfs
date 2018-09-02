import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import css from './Albums.css';

const isTrackSelected = (selectedTrack, track) =>
  selectedTrack && selectedTrack.id === track.id;

const getTrackListItemClassName = (selectedTrack, track) =>
  `${css.trackListItem} ${
    isTrackSelected(selectedTrack, track) ? css.trackListItemSelected : ''
  }`;

class TrackItem extends Component {
  render() {
    const { track, currentTrack, onClick } = this.props;

    return (
      <div
        key={track.id}
        onClick={onClick.bind(track)}
        class={getTrackListItemClassName(currentTrack, track)}
      >
        <div class={css.trackIcon}>
          {isTrackSelected(currentTrack, track) ? (
            <i class="fas fa-play" />
          ) : null}
        </div>
        <div class={css.trackNumber}>
          {track.number ? `${parseInt(track.number, 10)}.` : '-'}
        </div>
        <div class={css.trackTitle}>{track.title}</div>
      </div>
    );
  }
}

TrackItem.defaultProps = {
  track: {},
  currentTrack: null
};

const mapStateToProps = ({ player }) => ({
  currentTrack: player.currentTrack
});

export default connect(
  mapStateToProps,
  {}
)(TrackItem);
