import { Router } from "express";
import { getRepository } from "typeorm";
import { User } from "./models/User";

const routes = Router();

routes.post("/", async (req, res) => {
  try {
    const repo = getRepository(User);
    console.log("Inserting a new user into the database...");
    const user = new User();
    user.username = "nicholas";
    user.email = "cabral";
    user.password = "202020202";
    await repo.save(user);

    console.log("Loading users from the database...");
    const users = await repo.find();
    console.log("Loaded users: ", users);
  } catch (err) {
    console.log("err =>> ", err.message);
  }
});

export { routes };
