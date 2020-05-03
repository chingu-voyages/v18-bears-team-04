const axios = require("axios");
const mongoose = require("mongoose");
const httpSetup = require("./setup/http-setup");

let listener;

beforeAll(async function () {
  await mongoose.connect(global.__MONGO_URI__);
  listener = await httpSetup();
});

describe("GET User list", () => {
  test("It should respond to the GET method", async (done) => {
    const result = await axios.get("http://localhost:5000/api/user/all");
    expect(result.status).toBe(200);
    done();
    //expect(result.data.payload.length).toBeGreaterThan(0);
  });
});

afterAll(async function (done) {
  listener.close();
  await mongoose.disconnect();
  done();
});
