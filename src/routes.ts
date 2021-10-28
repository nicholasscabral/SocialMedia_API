import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { AuthController } from "./controllers/AuthController";
import { PostController } from "./controllers/PostController";

const routes = Router();

const userController = new UserController();
const authController = new AuthController();
const postController = new PostController();

// auth routes
routes.post("/", authController.register);
routes.post("/login", authController.login);
routes.post("/forgot_password", authController.forgot_password);
routes.post("/password/reset", authController.reset_password);

// user routes
routes.put("/follow/:id", userController.follow);
routes.put("/unfollow/:id", userController.unfollow);

routes.get("/followers/:id", userController.followers);
routes.get("/followings/:id", userController.followings);
routes.get("/:id", userController.get);
routes.get("/", userController.getAll);

// posts routes
routes.post("/post", postController.create);

export { routes };
