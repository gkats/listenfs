import { index as apiIndex, show as apiShow } from './api';

const indexOk = artists => ({
  type: 'ARTISTS_INDEX_OK',
  artists
});

const indexError = ({ message }) => ({
  type: 'ARTISTS_INDEX_ERR',
  message
});

export const index = () => {
  return dispatch => {
    dispatch({ type: 'ARTISTS_INDEX' });

    apiIndex()
      .then(resp =>
        resp.json().then(data => {
          dispatch(resp.ok ? indexOk(data) : indexError(data));
        })
      )
      .catch(error => {
        dispatch(indexError({ message: 'Something went wrong' }));
      });
  };
};

const showOk = albums => ({
  type: 'ARTISTS_SHOW_OK',
  albums
});

const showError = ({ message }) => ({
  type: 'ARTISTS_SHOW_ERR',
  message
});

export const show = artistName => {
  return dispatch => {
    dispatch({ type: 'ARTISTS_SHOW' });

    apiShow(artistName)
      .then(resp =>
        resp.json().then(data => {
          dispatch(resp.ok ? showOk(data) : showError(data));
        })
      )
      .catch(error => {
        dispatch(showError({ message: 'Something went wrong' }));
      });
  };
};
