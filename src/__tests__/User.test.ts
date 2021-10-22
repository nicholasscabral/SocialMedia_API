import { getConnection } from "typeorm";
import { app } from "../app";
import request from "supertest";
import createConnection from "../database";

describe("User", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a user", async () => {
    const res = await request(app).post("/").send({
      username: "test user",
      email: "testuser@example.com",
      password: "testpassword",
      profilePicture: "some picture",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
  });

  it("Should be able to login a user", async () => {
    const res = await request(app).post("/login").send({
      username: "test user",
      password: "testpassword",
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
