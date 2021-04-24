import React from 'react';
import './dashboard.scss';
import { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import useAuth from '../../useAuth';
import axios from 'axios';
import SpotifyWebAPi from 'spotify-web-api-node';
import TrackSearchResults from '../../components/trackSearchResluts';
import Player from '../../components/player';

const spotifyApi = new SpotifyWebAPi({
  clientId: '7e75d7815952445b89788150951776ba',
  // clientSecret: '493080b0090a4bfb8e4da97bc9f7ddef',
});

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch('');
  }

  function handleChange(event) {
    if (event == '') setSearch('');
    setSearch(event);
  }
  // if (search == '') {
  //   setSearchResults(() => []);
  // }
  // searchResults.forEach((x) => {
  //   console.log(x.uri);
  // });

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    let cancel = false;

    if (search === ' ' || !search) return setSearchResults([]);
    if (!accessToken) return;

    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              // if (smallest != null) {
              if (image.height < smallest.height) return image;
              return smallest;
              // }
            },
            track.album.images[0]
          );
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.album.uri,
            albumUri: smallestAlbumImage.url,
          };
        })
      );
    });
    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <div className="dashboard-wrapper">
      <Container className="dashboard">
        <div style={{ position: 'relative' }}>
          <Form.Control
            className="dashboard-search effect-1"
            type="search"
            placeholder="Search songs / Artist"
            value={search}
            // onChange={(e) => setSearch(e.target.value)}
            onChange={(e) => handleChange(e.target.value)}
          />
          <span className="focus-border"></span>
        </div>
        <div className="songs">
          {searchResults.map((track) => (
            <TrackSearchResults
              chooseTrack={chooseTrack}
              track={track}
              key={track.uri}
            />
          ))}
        </div>
        <div
          style={{ color: 'white', marginTop: 'auto', marginBottom: '20px' }}
        >
          {/* <Player accessToken={accessToken} trackUri={playingTrack?.uri} /> */}
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
