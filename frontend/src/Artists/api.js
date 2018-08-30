import { get } from '../api';

export const index = query => {
  let url = 'artists';
  if (query) {
    url += `?q=${query}`;
  }
  return get(url);
};

export const show = name => get(`artists/${name}`);
