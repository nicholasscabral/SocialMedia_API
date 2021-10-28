import { Router } from "express";
import { UserController } from "./controllers/UserController";
import {} from "./middlewares/AuthMiddleware";
import { PostController } from "./controllers/PostController";

const routes = Router();

const userController = new UserController();
const authMiddleware = new AuthMiddleware();
const postController = new PostController();

// auth routes
routes.post("/auth/signup", authMiddleware.register);
routes.post("/auth/login", authMiddleware.login);
routes.post("/auth/forgot_password", authMiddleware.forgot_password);
routes.post("/auth/password/reset", authMiddleware.reset_password);

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
