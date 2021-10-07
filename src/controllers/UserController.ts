import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  // private userService: UserService;

  // constructor() {
  //   this.userService = new UserService();
  // }

  async create(req: Request, res: Response) {
    try {
      const { username, email, password, profilePicture } = req.body;

      const userService = new UserService();

      const user = await userService.create({
        username,
        email,
        password,
        profilePicture,
      });

      console.log("user created: ", user);
      return res.json(user);
    } catch (err) {
      console.log("UserController.create =>> ", err.message);
    }
  }
}
