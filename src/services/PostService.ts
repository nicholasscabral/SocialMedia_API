import { getCustomRepository } from "typeorm";
import { Post } from "../models/Post";
import { PostRepository } from "../repositories/PostRepository";
import { UserRepository } from "../repositories/UserRepository";

export class PostService {
  private postRepository: PostRepository;

  constructor() {
    this.postRepository = getCustomRepository(PostRepository);
  }

  async create(user_id: string, desc: string, img: string) {
    try {
      const userRepository = getCustomRepository(UserRepository);

      const userExists = await userRepository.exists(user_id);

      if (!userExists) {
        return { error: true, message: "User not found." };
      }

      const user = await userRepository.findWithUnselected(user_id);

      const post = new Post();
      post.user = user;
      post.desc = desc;
      post.img = img;
      post.likes = [];

      const savedPost = await this.postRepository.save(post);

      return { error: false, post: savedPost };
    } catch (err) {
      console.log("PostService.create =>> ", err.message);
      return { error: true };
    }
  }

  async findOne(id: string): Promise<Post | any> {
    try {
      const allPosts = await this.postRepository.find({ relations: ["user"] });

      const post = allPosts.find((post) => post.id === id);

      return post ? { ok: true, post } : { ok: false };
    } catch (err) {
      console.log("PostService.findOne =>> ", err.message);
      return { ok: false };
    }
  }

  async findByUser(userId: string) {
    try {
      const allPosts = await this.postRepository.find({
        relations: ["user"],
      });

      const userPosts = allPosts.filter((post) => post.user.id === userId);

      userPosts.forEach((post) => delete post.user);

      return { ok: true, userPosts };
    } catch (err) {
      console.log("PostService.findByUser =>> ", err.message);
      return { ok: false };
    }
  }
}
