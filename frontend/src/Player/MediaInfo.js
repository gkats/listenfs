import { h } from 'preact';
import Link from '../Link/Link';

import css from './Player.css';

const MediaInfo = ({ title, artist, album }) => (
  <div class={css.mediaInfo}>
    <div class={css.mediaInfoCoverContainer}>
      {album.cover ? (
        <img width={56} height={56} src={album.cover} />
      ) : (
        <div class={css.mediaInfoCover}>
          <Link href={`#/albums/${artist.name}/${album.uri}`} relative={true}>
            <i class="fas fa-dot-circle" />
          </Link>
        </div>
      )}
    </div>
    <div>
      <div class={css.mediaInfoTrackTitle}>
        <Link href={`#/albums/${artist.name}/${album.uri}`} relative={true}>
          {title}
        </Link>
      </div>
      <div class={css.mediaInfoArtistName}>
        <Link href={`#/artists/${artist.name}`} relative={true}>
          {artist.name}
        </Link>
      </div>
    </div>
  </div>
);

export default MediaInfo;
