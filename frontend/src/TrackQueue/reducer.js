const initialState = {
  tracks: {}
};

const trackQueue = (state = initialState, action) => {
  switch (action.type) {
    case 'TRACK_QUEUE_ADD_TRACK':
      return Object.assign({}, state, {
        tracks: {
          ...state.tracks,
          [action.track.id]: action.track
        }
      });
    case 'TRACK_QUEUE_REMOVE_TRACK':
      let { [action.track.id]: omit, ...tracks } = state.tracks;
      return Object.assign({}, state, {
        tracks
      });
    case 'TRACK_QUEUE_ADD_ALBUM':
      return Object.assign({}, state, {
        tracks: Object.assign(
          {},
          state.tracks,
          action.tracks.reduce((tracks, track) => {
            tracks[track.id] = track;
            return tracks;
          }, {})
        )
      });
    case 'TRACK_QUEUE_CLEAR':
      return Object.assign({}, state, { tracks: {} });
    default:
      return state;
  }
};

export default trackQueue;
