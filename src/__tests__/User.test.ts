import { getConnection } from "typeorm";
import { app } from "../app";
import request from "supertest";
import createConnection from "../database";

describe("User", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    console.log(connection.name, connection.options);
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
});
