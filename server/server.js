const express = require('express');
const cors = require('cors');
const spotifyWebApi = require('spotify-web-api-node');
const app = express();
const bodyParser = require('body-parser');

require('dotenv').config('/.env.local');
// app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

let port = process.env.PORT;
let CLIENT_ID = process.env.CLIENT_ID;
let CLIENT_SECRET = process.env.CLIENT_SECRET;

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new spotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
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
      console.log('Server is Running');
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

app.listen(port);
