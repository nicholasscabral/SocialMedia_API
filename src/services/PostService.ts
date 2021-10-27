import { getCustomRepository } from "typeorm";
import { PostRepository } from "../repositories/PostRepository";

export class PostService {
  private postRepository: PostRepository;

  constructor() {
    this.postRepository = getCustomRepository(PostRepository);
  }
}
