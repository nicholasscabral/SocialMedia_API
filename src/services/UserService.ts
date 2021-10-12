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
}
