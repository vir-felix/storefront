#!/usr/bin/env node

/* eslint-disable no-console */
const http = require("http");

/* eslint-disable camelcase */
const bodyEncoded = JSON.stringify({
  client_id: process.env.OAUTH2_CLIENT_ID || "reaction-next-starterkit",
  client_secret: process.env.OAUTH2_CLIENT_SECRET || "CHANGEME",
  grant_types: [
    "authorization_code",
    "refresh_token",
    "client_credentials",
    "implicit"
  ],
  jwks: {},
  redirect_uris: [
    process.env.OAUTH2_REDIRECT_URL || "http://localhost:4000/callback"
  ],
  response_types: ["token", "code", "id_token"],
  scope: "openid offline",
  subject_type: "public",
  token_endpoint_auth_method: "client_secret_post"
});
/* eslint-enable camelcase */

const options = {
  hostname: process.env.OAUTH2_HOST || "hydra.auth.reaction.localhost",
  port: process.env.OAUTH2_ADMIN_PORT || 4445,
  path: "/clients",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(bodyEncoded)
  }
};

const req = http.request(options, (res) => {
  res.setEncoding("utf8");
  let body = "";
  res.on("data", (chunk) => {
    body += chunk.toString();
  });
  res.on("end", () => {
    switch (res.statusCode) {
      case 200:
      // intentional fallthrough!
      // eslint-disable-line no-fallthrough
      case 201:
        console.log("OK: hydra client created");
        break;
      case 409:
        console.log("OK: hydra client already exists");
        break;
      default:
        console.error("ERROR: Could not create hydra client");
        console.error(body);
        process.exit(10);
    }
  });
});

req.on("error", (error) => {
  console.error("ERROR: Could not create hydra client");
  console.error(error.message);
  process.exit(11);
});

req.end(bodyEncoded);
