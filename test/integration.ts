import * as httpClient from 'httpie';
import * as Colyseus from "colyseus.js";
import { DB } from '../src/database';
import assert from "assert";

describe("Integration", () => {

  const url = "http://localhost:2567";
  const ws = "ws://localhost:2567";
  const dummy_username = "INTEGRATION_TEST";
  const dummy_email = "test@example.com";
  const dummy_password = "test";

  var access_token = "";

  const client = new Colyseus.Client(`${ws}`);

  var shipBuilderRoom;

  describe("signup, login and renew", () => {
    after(async () => {
      await DB.init().then(() => {
        DB.$accounts.deleteOne({username: dummy_username});
        DB.$ships.deleteMany({username: dummy_username});
        console.log("\nDone cleaning database for integration test");
      })
    })

    it("should respond to POST /signup to register a user", async() => {
      const response = await httpClient.post(`${url}/signup`, {
        body: {
          username: dummy_username,
          email: dummy_email,
          password: dummy_password
        }
      });

      assert.ok(response.data.success);
      assert.ok(response.data.token);

    });

    it("should respond to POST /login to login the registered user", async() => {
      const response = await httpClient.post(`${url}/login`, {
        body: {
          email: dummy_email,
          password: dummy_password
        }
      });

      assert.ok(response.data.success);
      assert.ok(response.data.token);

      access_token = response.data.token;
    });

    it("should respond to POST /renew to renew the users token", async() => {
      const response = await httpClient.post(`${url}/renew`, {
        body: {
          token: access_token
        }
      });

      assert.ok(response.data.success);
      assert.ok(response.data.token);

      access_token = response.data.token;
    });

    it("should respont to JOIN /ShipBuilderRoom to allow the user to create a ship", async() => {
      shipBuilderRoom = await client.joinOrCreate('ShipBuilderRoom', {token: access_token});
      let promise = await new Promise((resolve) => {
        shipBuilderRoom.onMessage((message) => {
          console.log(message);
          if(message.action == 'ships') {
            assert.ok(message.ships);
            if(Object.keys(message.ships).length === 0){
              console.log('Attempting to build a ship');
              shipBuilderRoom.send({action: 'create', ship: {
                name: 'Test Ship Name',
                body_visual: 1,
                wing_visual: 1,
                weapon_visual: 1,
                engine_visual: 1,
                primary_attack: 1,
                secondary_attack: 1,
                weapon_type: 1,
                shield_type: 1,
                hull_type: 1,
                engine_type: 1
              }});
            } else {
              resolve(message);
            }
          }
        });
      });
      console.log(promise);

    });


  });
})
