import { get } from '../api';

export const index = () => get('artists');

export const show = name => get(`artists/${name}`);
