import { connection } from "../database";

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.close();
});

beforeEach(async () => {
  await connection.clear();
});

it("", () => {
  expect(6 % 2).toBe(0);
});
