// const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const { makeRidersArray } = require("./riders.fixtures");
// const { makeHorsesArray } = require("./horses.fixtures");

describe("Stable Software Endpoints", function () {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("clean the table", () =>
    db.raw("TRUNCATE stable_horses, stable_riders RESTART IDENTITY CASCADE")
  );

  afterEach("cleanup", () =>
    db.raw("TRUNCATE stable_horses, stable_riders RESTART IDENTITY CASCADE")
  );

  describe("GET /api/riders", () => {
    context("Given no riders", () => {
      it("responds with an empty array", () => {
        return supertest(app).get("/api/riders").expect(200, []);
      });
    });

    context("Given there are riders in the table", () => {
      const testRiders = makeRidersArray();

      beforeEach("insert riders", () => {
        return db.into("stable_riders").insert(testRiders);
      });

      it("responds with all riders", () => {
        return supertest(app).get("/api/riders").expect(200, testRiders);
      });
    });
  });

  describe.only("GET /api/horses", () => {
    context("Given there are no horse", () => {
      it("responds with an empty array", () => {
        return supertest(app).get("/api/horses").expect(200, []);
      });
    });
  });
});
