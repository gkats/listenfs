import { h, Component } from './Songs';
import css from './Albums.css';
import Player from '../Player/Player';

const getSongListItemClassName = (selectedSong, song) =>
  `${css.songListItem} ${
    selectedSong && selectedSong.title === song.title
      ? css.songListItemSelected
      : ''
  }`;

class Songs extends Component {
  render() {
    return this.props.songs.length ? (
      <div>
        <div class={css.songList}>
          {this.props.songs.map(s => (
            <div
              key={s.title}
              onClick={this.songClicked.bind(this, s)}
              class={getSongListItemClassName(this.state.currentSong, s)}
            >
              <div class={css.songNumber}>
                {s.number ? `${parseInt(s.number, 10)}.` : '-'}
              </div>
              <div class={css.songTitle}>{s.title}</div>
            </div>
          ))}
        </div>
        <div class={css.playerContainer}>
          <div class={css.player}>
            <Player
              src={
                this.state.currentSong
                  ? `${this.props.spaHost}/tracks/${
                      this.state.currentSong.location
                    }`
                  : null
              }
              onPrev={this.prevClicked}
              onNext={this.nextClicked}
              onPlay={this.playClicked}
              isPrevDisabled={!this.state.currentSong}
              isNextDisabled={!this.state.currentSong}
              isPlaying={this.state.isPlaying}
            />
          </div>
        </div>
      </div>
    ) : (
      <div class={css.noneFound}>No songs found.</div>
    );
  }
}

export default Songs;
