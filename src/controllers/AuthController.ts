import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { username, email, password, profilePicture } = req.body;

      const userService = new UserService();

      const response = await userService.create({
        username,
        email,
        password,
        profilePicture,
      });

      if (!response.created)
        return res.status(403).json({ message: response.message });

      return res.status(201).json(response.user);
    } catch (err) {
      console.log("UserController.register =>> ", err.message);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      if (!username || !password)
        return res.status(400).json({ message: "missing credentials" });

      const userService = new UserService();

      const response = await userService.login(username, password);

      if (!response.authenticated)
        return res.status(403).json({ message: response.message });

      return res.status(200).json(response.token);
    } catch (err) {
      console.log("UserController.login", err.message);
    }
  }
}
