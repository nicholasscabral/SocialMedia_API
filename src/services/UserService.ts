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

  async exists(id: string): Promise<boolean> {
    return await this.userRepository.exists(id);
  }

  async get(id: string) {
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
      console.log("UserService.get", err.message);
      return { found: false };
    }
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
      console.log("UserService.unfollow", err.message);
    }
  }

  async listFollowers(userId: string): Promise<any[]> {
    return await this.userRepository.listfollowers(userId);
  }

  async listFollowings(userId: string): Promise<any[]> {
    return await this.userRepository.listFollowings(userId);
  }
}
