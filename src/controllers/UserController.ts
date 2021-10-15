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
}
