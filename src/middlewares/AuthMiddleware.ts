import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { mailer } from "../modules/mailer";

export class AuthMiddleware {
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
      console.log("AuthMiddleware.register =>> ", err.message);
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

      return res.status(200).json({ token: response.token });
    } catch (err) {
      console.log("AuthMiddleware.login =>> ", err.message);
    }
  }

  async forgot_password(req: Request, res: Response) {
    const email = req.body.email;

    try {
      const userService = new UserService();

      const user = await userService.findByEmail(email);

      if (!user) return res.status(404).json({ message: "User not found" });

      const token = await userService.generatePasswordToken(user);

      mailer
        .sendMail({
          to: email,
          from: "nicholas@teste.com",
          subject: "password reset",
          template: "forgot_password",
          context: { token },
        })
        .then(() => {
          console.log("email sent successfully");
          return res
            .status(200)
            .json({ message: "email sent, check your email box" });
        });
    } catch (err) {
      console.log("AuthMiddleware.forgot_password =>> ", err.message);
      return res
        .status(400)
        .json({ err: "error on forgot password, try again" });
    }
  }

  async reset_password(req: Request, res: Response) {
    const { email, token, password } = req.body;

    try {
      const userService = new UserService();

      const user = await userService.findByEmail(email);

      if (!user) return res.status(404).json({ message: "User not found" });

      const response = await userService.checkToken(user, token, password);

      if (!response.passwordReseted)
        return res.status(400).json({ message: response.message });

      return res.status(200).json({ message: response.message });
    } catch (err) {
      console.log("AuthMiddleware.reset_password =>> ", err.message);
      return res
        .status(400)
        .json({ message: "cannot reset password, try again" });
    }
  }
}
