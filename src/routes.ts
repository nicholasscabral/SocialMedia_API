import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { AuthController } from "./middlewares/AuthMiddleware";
import { PostController } from "./controllers/PostController";

const routes = Router();

const userController = new UserController();
const authController = new AuthController();
const postController = new PostController();

// auth routes
routes.post("/auth/signup", authController.register);
routes.post("/auth/login", authController.login);
routes.post("/auth/forgot_password", authController.forgot_password);
routes.post("/auth/password/reset", authController.reset_password);

// user routes
routes.put("/follow/:id", userController.follow);
routes.put("/unfollow/:id", userController.unfollow);

routes.get("/:username/followers", userController.followers);
routes.get("/:username/following", userController.following);
routes.get("/user/:username", userController.get);
routes.get("/users", userController.getAll);

// posts routes
routes.post("/post", postController.create);

export { routes };
