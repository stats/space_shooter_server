import * as httpClient from 'httpie';
import { DB } from '../src/database';
import assert from "assert";

describe("Server", () => {

  const url = "http://localhost:2567";
  const ws = "ws://localhost:2567";
  const dummy_username = "INTEGRATION_TEST";
  const dummy_email = "test@example.com";
  const dummy_password = "test";

  var access_token = "";

  describe("signup, login and renew", () => {
    after(async () => {
      await DB.init();
      await DB.$accounts.deleteMany({username: dummy_username});
      await DB.$ships.deleteMany({username: dummy_username});
    })

    it("should respond to POST /quick_login to register a user", async() => {
      const response = await httpClient.post(`${url}/quick_login`, {
        body: {
          system_id: 1
        }
      });

      assert.ok(response.data.success);
      assert.ok(response.data.token);
    });

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
  });
})
