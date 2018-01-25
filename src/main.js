export const search = (query, type) =>
  fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}`)
    .then(data => data.json());

export const searchArtists = query =>
  search(query, 'artist');

export const searchAlbums = query =>
  search(query, 'albums');
export const searchTrack = query =>
  search(query, 'track');

export const searchPlaylist = query =>
  search(query, 'playlist');
