// SPA_HOST is set through webpack config
const SPA_URL = `${SPA_HOST}/spa`;

const defaultOptions = Object.freeze({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

const urlFor = endpoint => `${SPA_URL}/${endpoint}`;

const apiFetch = (endpoint, options = {}) => {
  return fetch(urlFor(endpoint), Object.assign({}, defaultOptions, options));
};

export const get = (endpoint, options = {}) =>
  apiFetch(endpoint, Object.assign({}, options, { method: 'GET' }));

export const post = (endpoint, options = {}) =>
  apiFetch(endpoint, Object.assign({}, options, { method: 'POST' }));

export const patch = (endpoint, options = {}) =>
  apiFetch(endpoint, Object.assign({}, options, { method: 'PATCH' }));

export const doDelete = (endpoint, options = {}) =>
  apiFetch(endpoint, Object.assign({}, options, { method: 'DELETE' }));

export const queryString = (params = {}) =>
  Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');