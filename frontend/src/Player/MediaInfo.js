import { h } from 'preact';
import Link from '../Link/Link';

import css from './Player.css';

const MediaInfo = ({ title, artistName, album }) => (
  <div class={css.mediaInfo}>
    <div class={css.mediaInfoCoverContainer}>
      {album.cover ? (
        <img width={56} height={56} src={album.cover} />
      ) : (
        <div class={css.mediaInfoCover}>
          <Link
            href={`#/albums/${artistName}/${album.filename}`}
            relative={true}
          >
            <i class="fas fa-dot-circle" />
          </Link>
        </div>
      )}
    </div>
    <div>
      <div class={css.mediaInfoSongTitle}>
        <Link href={`#/albums/${artistName}/${album.filename}`} relative={true}>
          {title}
        </Link>
      </div>
      <div class={css.mediaInfoArtistName}>
        <Link href={`#/artists/${artistName}`} relative={true}>
          {artistName}
        </Link>
      </div>
    </div>
  </div>
);

export default MediaInfo;
