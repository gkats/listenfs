import { get } from '../api';

export const show = ({ artistName, albumName }) =>
  get(`albums/${artistName}/${albumName}`);
