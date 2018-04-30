const initialState = {
  isLoading: false,
  album: {}
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
        album: action.album
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
