import { getCustomRepository } from "typeorm";
import { User } from "../models/User";
import { UserRepository } from "../repositories/UserRepository";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as crypto from "crypto";

interface IUser {
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
}

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  async exists(id: string): Promise<boolean> {
    return await this.userRepository.exists(id);
  }

  async findById(id: string) {
    try {
      const user = await this.userRepository.findById(id);

      const formatedUser = {
        id: user.id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        posts: user.posts,
        followers: user.followers,
        following: user.following,
      };

      return { found: true, user: formatedUser };
    } catch (err) {
      console.log("UserService.findById =>> ", err.message);
      return { found: false };
    }
  }

  async generatePasswordToken(user: User) {
    try {
      const token = crypto.randomBytes(20).toString("hex");

      const now = new Date();
      now.setHours(now.getHours() + 1);

      user.passwordresettoken = token;
      user.passwordtokenexpires = now;

      await this.userRepository.save(user);

      console.log({ token, now });

      return token;
    } catch (err) {
      console.log("UserService.generatePasswordToken =>> ", err.message);
    }
  }

  async checkToken(user: User, token: string, newPassword: string) {
    try {
      const { passwordresettoken, passwordtokenexpires } =
        await this.userRepository.findToken(user.email);

      if (passwordresettoken !== token)
        return { passwordReseted: false, message: "Invalid token" };

      const now = new Date();

      if (now > passwordtokenexpires)
        return { passwordReseted: false, message: "expired token" };

      const hashedPassword = await bcrypt.hash(newPassword, 8);

      user.password = hashedPassword;
      user.passwordresettoken = null;
      user.passwordtokenexpires = null;

      await this.userRepository.save(user);

      return {
        passwordReseted: true,
        message: `password changed: ${hashedPassword}`,
      };
    } catch (err) {
      console.log("UserService.checkToken =>> ", err.message);
    }
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findByEmail(email);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async create({ username, email, password, profilePicture }: IUser) {
    try {
      const verification = await this.userRepository.verify(username, email);

      if (verification.error) {
        return { error: true, message: verification.message };
      }

      const hashedPassword = await bcrypt.hash(password, 8);

      const user = new User();
      user.username = username;
      user.email = email;
      user.password = hashedPassword;
      user.profilePicture = profilePicture;
      user.posts = [];
      user.followers = [];
      user.following = [];

      await this.userRepository.save(user);

      return { error: false, user };
    } catch (err) {
      console.log("UserService.create =>> ", err.message);
      return { error: true, message: "Internal server error" };
    }
  }

  async delete(id: string) {
    try {
      const deleteResult = await this.userRepository.delete(id);

      if (deleteResult.affected !== 1) return { ok: false };

      return { ok: true, deleteResult };
    } catch (err) {
      console.log("UserService.delete =>> ", err.message);
      return { ok: false };
    }
  }

  async login(username: string, password: string) {
    try {
      const userExists = await this.userRepository.findByUsername(username);

      if (!userExists)
        return {
          authenticated: false,
          message: "username or password is incorrect",
        };

      const response = await this.userRepository.findPassword(username);
      const { id, hashedPassword } = response;

      const passwordsMatch = await bcrypt.compare(password, hashedPassword);

      if (!passwordsMatch)
        return {
          authenticated: false,
          message: "username or password is incorrect",
        };

      const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      return { authenticated: true, token: token };
    } catch (err) {
      console.log("UserService.login =>> ", err.message);
    }
  }

  async follow(currentUserId: string, userId: string) {
    try {
      let currentUser = await this.userRepository.findById(currentUserId);
      let user = await this.userRepository.findById(userId);

      if (currentUser.following.includes(userId))
        return { message: "you already follow this user" };

      currentUser.following.push(userId);
      user.followers.push(currentUserId);

      currentUser = await this.userRepository.save(currentUser);
      user = await this.userRepository.save(user);

      return { following: currentUser, beingFollowed: user };
    } catch (err) {
      console.log("UserService.follow =>> ", err.message);
    }
  }

  async unfollow(currentUserId: string, userId: string) {
    try {
      const currentUser = await this.userRepository.findById(currentUserId);
      const user = await this.userRepository.findById(userId);

      if (!currentUser.following.includes(userId))
        return { message: "you do not follow this user" };

      const i = currentUser.following.indexOf(userId);
      const j = user.followers.indexOf(currentUserId);

      const unfollowed = currentUser.following.splice(i, 1);
      user.followers.splice(j, 1);

      await this.userRepository.save(currentUser);
      await this.userRepository.save(user);

      return { unfollowed: unfollowed, followings: currentUser.following };
    } catch (err) {
      console.log("UserService.unfollow =>> ", err.message);
    }
  }

  async listFollowers(userId: string): Promise<any[]> {
    return await this.userRepository.listfollowers(userId);
  }

  async listFollowings(userId: string): Promise<any[]> {
    return await this.userRepository.listFollowings(userId);
  }
}
