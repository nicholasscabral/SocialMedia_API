import { getRepository } from "typeorm";
import { User } from "../models/User";

interface IUser {
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
}

export class UserService {
  // private userRepository: Repository<User>;

  // constructor() {
  //   this.userRepository = getRepository(User);
  // }

  async create({ username, email, password, profilePicture }: IUser) {
    try {
      const userRepository = getRepository(User);

      const user = userRepository.create({
        username,
        email,
        password,
        profilePicture,
      });

      await userRepository.save(user);

      return user;
    } catch (err) {
      console.log("UserService.create =>> ", err.message);
    }
  }
}
