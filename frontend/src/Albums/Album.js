import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { show } from './actions';
import { play } from '../Player/actions';
import Loader from '../Loader/Loader';
import Link from '../Link/Link';
import css from './Albums.css';

const getSongListItemClassName = (selectedSong, song) =>
  `${css.songListItem} ${
    selectedSong && selectedSong.id === song.id ? css.songListItemSelected : ''
  }`;

class Album extends Component {
  componentDidMount() {
    const { artistName, albumName } = this.props.route;
    this.props.show({ artistName, albumName });
  }

  songClicked(song) {
    this.props.play(song);
  }

  render() {
    const { artistName, albumName } = this.props.route;

    return (
      <div class={css.wrapper}>
        <div class={css.banner}>
          <div class={css.mediaInfo}>
            <div class={css.mediaTitle}>{this.props.album.title}</div>
            <div>
              <span class={css.text}>by</span>&nbsp;
              <Link href={`#/artists/${artistName}`} relative={true}>
                {artistName}
              </Link>
            </div>
            <div class={css.mediaDetails}>
              {this.props.album.year}
              &nbsp; &bull; &nbsp;
              {this.props.songs.length} songs
            </div>
          </div>
        </div>
        {this.props.isLoading ? (
          <Loader visible={this.props.isLoading} />
        ) : this.props.songs.length ? (
          <div>
            <div class={css.songList}>
              {this.props.songs.map(s => (
                <div
                  key={s.id}
                  onClick={this.songClicked.bind(this, s)}
                  class={getSongListItemClassName(this.props.currentSong, s)}
                >
                  <div class={css.songNumber}>
                    {s.number ? `${parseInt(s.number, 10)}.` : '-'}
                  </div>
                  <div class={css.songTitle}>{s.title}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div class={css.noneFound}>No songs found.</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ albums, player }) => ({
  isLoading: albums.isLoading,
  album: albums.album,
  songs: (albums.album || {}).songs || [],
  currentSong: player.currentSong
});

export default connect(mapStateToProps, { show, play })(Album);
