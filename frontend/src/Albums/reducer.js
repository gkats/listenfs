const initialState = {
  isLoading: false,
  tracks: []
};

const artists = (state = initialState, action) => {
  switch (action.type) {
    case 'ALBUMS_SHOW':
      return Object.assign({}, state, {
        isLoading: true
      });
    case 'ALBUMS_SHOW_OK':
      return Object.assign({}, state, {
        isLoading: false,
        tracks: action.tracks
      });
    case 'ALBUMS_SHOW_ERR':
      return Object.assign({}, state, {
        isLoading: false
      });
    default:
      return state;
  }
};

export default artists;
