import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { AuthController } from "./controllers/AuthController";

const routes = Router();

const userController = new UserController();
const authController = new AuthController();

routes.post("/", authController.register);
routes.post("/login", authController.login);

routes.put("/follow/:id", userController.follow);
routes.put("/unfollow/:id", userController.unfollow);

routes.get("/followers/:id", userController.followers);
routes.get("/followings/:id", userController.followings);
routes.get("/:id", userController.get);
routes.get("/", userController.getAll);

export { routes };
