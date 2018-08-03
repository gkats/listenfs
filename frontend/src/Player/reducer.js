const initialState = {
  isPlaying: false,
  currentTrack: null,
  tracks: []
};

const player = (state = initialState, action) => {
  switch (action.type) {
    case 'PLAYER_PLAY':
      return Object.assign({}, state, {
        currentTrack: action.track,
        isPlaying: !!action.track
      });
    case 'PLAYER_PAUSE':
      return Object.assign({}, state, {
        isPlaying: false
      });
    case 'PLAYER_LOAD_TRACKS':
      return Object.assign({}, state, {
        tracks: action.tracks
      });
    default:
      return state;
  }
};

export default player;
