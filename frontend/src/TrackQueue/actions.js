export const addTrack = track => ({
  type: 'TRACK_QUEUE_ADD_TRACK',
  track
});

export const removeTrack = track => ({
  type: 'TRACK_QUEUE_REMOVE_TRACK',
  track
});
