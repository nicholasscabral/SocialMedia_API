import { getCustomRepository } from "typeorm";
import { User } from "../models/User";
import { UserRepository } from "../repositories/UserRepository";

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

  async create({ username, email, password, profilePicture }: IUser) {
    try {
      const user = new User();
      user.username = username;
      user.email = email;
      user.password = password;
      user.profilePicture = profilePicture;
      user.posts = [];
      user.followers = [];
      user.following = [];

      await this.userRepository.save(user);

      return user;
    } catch (err) {
      console.log("UserService.create =>> ", err.message);
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
}
