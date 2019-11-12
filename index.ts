import path from 'path';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'colyseus';
import { monitor } from '@colyseus/monitor';

import { SelectShipRoom } from "./rooms/SelectShipRoom";
import { MatchMakerRoom } from "./rooms/MatchMakerRoom";
import { GameRoom } from "./rooms/GameRoom";

import { AccountHelper } from './helpers/AccountHelper';
import { JWTHelper } from './helpers/JWTHelper';

cost port = Number(process.env.PORT || 2567 ) + Number(process.env.NODE_APP_INSTANCE || 0);
const app = express();
const game_api = GameAPI();

app.use(cors());
app.user(express.json());

const gameServer = new Server({
  server: createServer(app);
  express: app
});

gameServer.define("SelectShipRoom", SelectShipRoom);
gameServer.define("ShipBuilderRoom", MatchMakerRoom);
gameServer.define("GameRoom", GameRoom);

app.use('/colyseus', monitor(gameServer));

app.post('/login', asyncMiddleware( async function(req, res, next) {
  let { email, password } = req.body;
  let account = null;
  try {
    account = await AccountHelper.getAccountByEmail(email);
  } catch (err) {
    res.status(401).json({
      message: "Unable to sign in.",
      error: err
    });
    return;
  }

  if(account && account.password == password){ //TODO: NEED TO SALT THIS PASSWORD CHECK
    res.status(200).json(JWTHelper.getSuccessJSON(account.username));
  } else {
    res.status(401).json({
      message: "Validation failed. Check your email and password and try again."
    });
  }
}));

app.post('/signup', asyncMiddleware( async function(req, res, next) {
  let { username, email, password } = req.body;
  if(username && email && password) {
    let account = null;
    try {
      account = await AccountHelper.createAccount(new Account({username: username, email: email, password: password })); //TODO: NEED TO SALT THIS PASSWORD CHECK
    } catch (err) {
      res.status(401).json({
        message: "Unable to create account.",
        error: err
      });
      return;
    }

    if(account) {
      res.status(200).json(JWTHelper.getSuccessJSON(account.username));
    } else {
      res.status(401).json({
        message: "Unable to create account. Null account."
      });
    }
  } else {
    res.status(401).json({
      message: "Unable to create account. Missing data."
    })
  }
}));

app.post('/renew', asyncMiddleware( async function(req, res, next) {
  let { token } = req.body;
  if(token) {
    if(JWTHelper.verifyToken(token)) {
      let username = JWTHelper.extractUsernameFromToken(token);
      res.status(200).json(JWTHelper.getSuccessJSON(username));
    } else {
      res.status(401).json({
        message: "Invalid token."
      });
    }
  } else {
    res.status(401).json({
      message: "Must supply access_token for renewal."
    });
    return;
  }
}));
