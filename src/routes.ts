import { Router } from "express";
import { UserController } from "./controllers/UserController";

const routes = Router();

const userController = new UserController();

routes.post("/", userController.register);

routes.put("/follow/:id", userController.follow);
routes.put("/unfollow/:id", userController.unfollow);

routes.get("/followers/:id", userController.followers);
routes.get("/followings/:id", userController.followings);
routes.get("/:id", userController.get);

export { routes };
