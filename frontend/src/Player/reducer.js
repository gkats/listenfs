const initialState = {
  isPlaying: false,
  currentSong: null
};

const player = (state = initialState, action) => {
  switch (action.type) {
    case 'PLAYER_PLAY':
      return Object.assign({}, state, {
        currentSong: action.song,
        isPlaying: !!action.song
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
