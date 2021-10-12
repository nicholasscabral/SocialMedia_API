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
}
