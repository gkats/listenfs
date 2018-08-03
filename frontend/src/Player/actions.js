export const play = track => ({
  type: 'PLAYER_PLAY',
  track
});

export const pause = () => ({
  type: 'PLAYER_PAUSE'
});

export const loadTracks = tracks => ({
  type: 'PLAYER_LOAD_TRACKS',
  tracks
});
