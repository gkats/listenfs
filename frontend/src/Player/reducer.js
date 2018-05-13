const initialState = {
  isPlaying: false,
  currentTrack: null
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
    default:
      return state;
  }
};

export default player;
