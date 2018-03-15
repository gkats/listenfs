import { index as apiIndex } from './api';

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