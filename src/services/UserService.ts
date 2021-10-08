import { getCustomRepository, getRepository } from "typeorm";
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
      const user = this.userRepository.create({
        username,
        email,
        password,
        profilePicture,
      });

      await this.userRepository.save(user);

      return user;
    } catch (err) {
      console.log("UserService.create =>> ", err.message);
    }
  }
}
