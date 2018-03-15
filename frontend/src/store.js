import { h } from 'preact';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'preact-redux';
import thunk from 'redux-thunk';
import artists from './Artists/reducer';

export const configureStore = (persistedState = {}) =>
  createStore(
    combineReducers({
      artists
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