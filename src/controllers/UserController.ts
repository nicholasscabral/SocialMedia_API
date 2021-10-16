import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  async register(req: Request, res: Response) {
    try {
      const { username, email, password, profilePicture } = req.body;

      const userService = new UserService();

      const user = await userService.create({
        username,
        email,
        password,
        profilePicture,
      });

      return res.json(user);
    } catch (err) {
      console.log("UserController.register =>> ", err.message);
    }
  }

  async get(req: Request, res: Response) {
    try {
      const userId = req.params.id;

      const userService = new UserService();

      const user = await userService.get(userId);

      if (!user.found)
        return res.status(404).json({ message: "User not found" });

      return res.status(200).json(user);
    } catch (err) {
      console.log("UserController.get", err.message);
    }
  }

  async follow(req: Request, res: Response) {
    try {
      const currentUserId = req.body.id;
      const userId = req.params.id;

      if (currentUserId == userId)
        return res.status(403).json({ message: "you cant follow yourself" });

      const userService = new UserService();

      const response = await userService.follow(currentUserId, userId);

      return res.json(response);
    } catch (err) {
      console.log("UserController.follow =>> ", err.message);
    }
  }

  async unfollow(req: Request, res: Response) {
    const currentUserId = req.body.id;
    const userId = req.params.id;

    if (currentUserId == userId)
      return res.status(403).json({ message: "you cant unfollow yourself" });

    const userService = new UserService();

    const response = await userService.unfollow(currentUserId, userId);

    return res.json(response);
  }

  async followers(req: Request, res: Response) {
    try {
      const userId = req.params.id;

      const userService = new UserService();

      const response = await userService.listFollowers(userId);

      return res.json(response);
    } catch (err) {
      console.log("UserController.followers", err.message);
      return res.status(500).json({ message: "internal error" });
    }
  }

  async followings(req: Request, res: Response) {
    try {
      const userId = req.params.id;

      const userService = new UserService();

      const response = await userService.listFollowings(userId);

      return res.json(response);
    } catch (err) {
      console.log("UserController.followings", err.message);
    }
  }
}
