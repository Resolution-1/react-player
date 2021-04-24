import React from 'react';
import './trackSearchResults.scss';

const TrackSearchResults = ({ track, chooseTrack }) => {
  function handlePlay() {
    chooseTrack(track);
  }
  return (
    <div className="tracks" onClick={handlePlay}>
      <img className="track-image" src={track.albumUri} />
      <div className="info">
        <div className="title">{track.title}</div>
        <div className="artist text-muted">{track.artist}</div>
      </div>
    </div>
  );
};

export default TrackSearchResults;
