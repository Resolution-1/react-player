const express = require('express');
const cors = require('cors');
const spotifyWebApi = require('spotify-web-api-node');
const app = express();
const bodyParser = require('body-parser');
// import 'body-parser';

// app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new spotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: '7e75d7815952445b89788150951776ba',
    clientSecret: '493080b0090a4bfb8e4da97bc9f7ddef',
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      // console.log(data.body);
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

app.post('/login', (req, res) => {
  const code = req.body.code;
  const spotifyApi = new spotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: '7e75d7815952445b89788150951776ba',
    clientSecret: '493080b0090a4bfb8e4da97bc9f7ddef',
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

app.listen(3001);
