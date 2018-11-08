import { h } from 'preact';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'preact-redux';
import thunk from 'redux-thunk';
import artists from './Artists/reducer';
import albums from './Albums/reducer';
import player from './Player/reducer';
import trackQueue from './TrackQueue/reducer';

export const configureStore = (persistedState = {}) =>
  createStore(
    combineReducers({
      artists,
      albums,
      player,
      trackQueue,
      config: (state = {}, action) => state
    }),
    persistedState,
    applyMiddleware(thunk)
  );

// Wraps a component with the redux <Provider />.
// Accepts the store that will provide state as a parameter.
export const withStore = store => {
  return Component => {
    return props => (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  };
};
