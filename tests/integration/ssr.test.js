/*
 *   Test to Verify NextJS rendering pages via SSR
 */
const cheerio = require("cheerio");
const chai = require("chai");
require("isomorphic-fetch");

const url = "http://localhost:4000";

describe("NextJS Loading", () => {
  // Skipping this test because it works locally but not on CI. Created issue to solve this soon.
  it.skip("SSR Loads with an HTML Body", () => fetch(url)
    .then((response) => {
      chai.expect(response.status).to.equal(200);

      return response.text();
    })
    .then((body) => {
      const cheer = cheerio.load(body);
      chai.expect(cheer("#__next").find("div")).to.not.be.empty;
      return null;
    }));
});
