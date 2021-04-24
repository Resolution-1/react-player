import React from 'react';
import './player.scss';
import SpotifyPlayer from 'react-spotify-web-playback';

export default function Player({ accessToken, trackUri }) {
  if (!accessToken) return null;
  return (
    <SpotifyPlayer
      style={{ marginTop: '-20px' }}
      token={accessToken}
      showSaveIcon
      uris={trackUri ? [trackUri] : []}
    />
  );
}
