import React from 'react';
import './login.scss';
import { Container } from 'react-bootstrap';

const AUTH_URI =
  'https://accounts.spotify.com/authorize?client_id=7e75d7815952445b89788150951776ba&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';
const Login = () => {
  return (
    <Container className=" login-container">
      <a className="btn btn-success btn-lg login-button" href={AUTH_URI}>
        Login With Spotify
      </a>
    </Container>
  );
};

export default Login;
