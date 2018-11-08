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
      const { [action.track.id]: omit, ...tracks } = state.tracks;
      return Object.assign({}, state, {
        tracks
      });
    default:
      return state;
  }
};

export default trackQueue;
