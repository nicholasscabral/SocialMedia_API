import { Router } from "express";
import { UserController } from "./controllers/UserController";

const routes = Router();

const userController = new UserController();

routes.post("/", userController.register);
routes.post("/login", userController.login);

routes.put("/follow/:id", userController.follow);
routes.put("/unfollow/:id", userController.unfollow);

routes.get("/followers/:id", userController.followers);
routes.get("/followings/:id", userController.followings);
routes.get("/:id", userController.get);
routes.get("/", userController.getAll);

export { routes };
