const initialState = {
  isLoading: false,
  artists: [],
  albums: []
};

const artists = (state = initialState, action) => {
  switch (action.type) {
    case 'ARTISTS_INDEX':
      return Object.assign({}, state, {
        isLoading: true
      });
    case 'ARTISTS_INDEX_OK':
      return Object.assign({}, state, {
        isLoading: false,
        artists: action.artists
      });
    case 'ARTISTS_INDEX_ERR':
      return Object.assign({}, state, {
        isLoading: false
      });
    case 'ARTISTS_SHOW':
      return Object.assign({}, state, {
        isLoading: true
      });
    case 'ARTISTS_SHOW_OK':
      return Object.assign({}, state, {
        isLoading: false,
        albums: action.albums
      });
    case 'ARTISTS_SHOW_ERR':
      return Object.assign({}, state, {
        isLoading: false
      });
    default:
      return state;
  }
};

export default artists;
