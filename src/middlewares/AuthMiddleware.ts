import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { mailer } from "../modules/mailer";

export class AuthMiddleware {
  async register(req: Request, res: Response) {
    try {
      const { username, email, password, passwordConfirm, profilePicture } =
        req.body;

      if (!username || !email || !password || !passwordConfirm)
        return res
          .status(400)
          .json({ message: "Required fields not provided" });

      if (password !== passwordConfirm)
        return res.status(400).json({ message: "Passwords does not match" });

      const userService = new UserService();

      const response = await userService.create({
        username,
        email,
        password,
        profilePicture,
      });

      if (response.error)
        return res.status(403).json({ message: response.message });

      return res.status(201).json(response.user);
    } catch (err) {
      console.log("AuthMiddleware.register =>> ", err.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      if (!username || !password)
        return res.status(400).json({ message: "missing credentials" });

      const userService = new UserService();

      const response = await userService.login(username, password);

      if (response.error)
        return res.status(403).json({ message: response.message });

      return res.status(200).json({ token: response.token });
    } catch (err) {
      console.log("AuthMiddleware.login =>> ", err.message);
      return res.status(500).json("Internal server error");
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

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const userService = new UserService();

      const userExists = await userService.exists(id);

      if (!userExists)
        return res.status(404).json({ message: "User not found" });

      const response = await userService.delete(id);

      if (!response.ok)
        return res.status(500).json({ message: "could not delete user" });

      return res.status(200).json({ message: "User deleted" });
    } catch (err) {
      console.log("AuthMiddleware.delete =>> ", err.message);
      return res.status(500).json({ message: "could not delete user" });
    }
  }
}
