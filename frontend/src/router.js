import Artists from './Artists/Artists';
import Artist from './Artists/Artist';
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
  } else if (path.match(/artists\/(.+)$/)) {
    return {
      Component: Artist,
      props: Object.assign({}, props, {
        route: {
          name: decodeURI(path.match(/artists\/(.+)$/)[1])
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
