const request = require("supertest");
const app = require("./app");

test("It should respond with Welcome", async () => {
  const res = await request(app).get("/");
  expect(res.text).toBe("Welcome");
});
