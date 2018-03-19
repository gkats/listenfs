const initialState = {
  isLoading: false,
  songs: []
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
        songs: action.songs
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
