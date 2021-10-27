import { EntityRepository, Repository } from "typeorm";
import { Post } from "../models/Post";

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {}
