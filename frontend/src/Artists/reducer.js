const initialState = {
  isLoading: false,
  artists: []
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
    default:
      return state;
  }
};

export default artists;