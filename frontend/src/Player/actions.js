export const play = song => ({
  type: 'PLAYER_PLAY',
  song
});

export const pause = () => ({
  type: 'PLAYER_PAUSE'
});
