import Artists from './Artists/Artists';
import Artist from './Artists/Artist';
import Album from './Albums/Album';
import TrackQueue from './TrackQueue/TrackQueue';
import NotFound from './NotFound/NotFound';

const props = {};

const resolvePath = hash =>
  hash
    .replace('#', '')
    .replace(/^\//, '')
    .replace(/\/$/, '')
    .replace(/\?.+/, '');

export const relativePath = path =>
  `${window.location.pathname}/${path}`.replace(/\/{2,}/, '/');

export default function router(hash) {
  const path = resolvePath(hash);

  if (path === '/' || path === '' || path === 'artists') {
    return {
      Component: Artists,
      props
    };
  } else if (path === 'queue') {
    return {
      Component: TrackQueue,
      props
    };
  } else if (path.match(/artists\/(.+)$/)) {
    return {
      Component: Artist,
      props: Object.assign({}, props, {
        route: {
          name: decodeURI(path.match(/artists\/(.+)$/)[1])
        }
      })
    };
  } else if (path.match(/albums\/(.+)\/(.+)$/)) {
    const matches = path.match(/albums\/(.+)\/(.+)$/);
    return {
      Component: Album,
      props: Object.assign({}, props, {
        route: {
          artistName: decodeURI(matches[1]),
          albumName: decodeURI(matches[2])
        }
      })
    };
  } else {
    return {
      Component: NotFound,
      props
    };
  }
}
