import { show as apiShow } from './api';

const showOk = songs => ({
  type: 'ALBUMS_SHOW_OK',
  songs
});

const showError = ({ message }) => ({
  type: 'ALBUMS_SHOW_ERR',
  message
});

export const show = ({ artistName, albumName }) => {
  return dispatch => {
    dispatch({ type: 'ALBUMS_SHOW' });

    apiShow({ artistName, albumName })
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
