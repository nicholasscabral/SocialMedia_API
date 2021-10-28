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

      const user = await userRepository.findWithUnselected(user_id);

      const post = new Post();
      post.user = user.id;
      post.desc = desc;
      post.img = img;
      post.likes = [];

      const savedPost = await this.postRepository.save(post);

      console.log(savedPost.user.id);

      const users = await userRepository.find({
        relations: ["posts"],
      });
      users[0].posts.forEach((post: Post) => {
        console.log(post);
      });

      return { error: false, post: savedPost };
    } catch (err) {
      console.log("PostService.create =>> ", err.message);
      return { error: true };
    }
  }
}
