const request = require("supertest");
const app = require("./app");

test("It should respond with Welcome", async () => {
  const res = await request(app).get("/");
  expect(res.text).toBe("Welcome");
});

test("It should return json object of business that matches the place_id", async () => {
    const place_id = "ChIJb8Xw0wz2wokRXhp1-HSLvkI"
    const res = await request(app).get(`/places/details?place_id=${place_id}`)
    const data = JSON.parse(res.text).result;
    expect(data.place_id).toBe(`${place_id}`)
})