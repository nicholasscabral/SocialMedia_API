import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async exists(id: string): Promise<boolean> {
    return (await this.findById(id)) != undefined ? true : false;
  }

  async findById(id: string): Promise<User> {
    return this.findOne(id);
  }

  async listfollowers(id: string): Promise<any[]> {
    const user = await this.findOne(id);

    let formatedArray = [];

    for (var i = 0; i < user.followers.length; i++) {
      const follower = await this.findById(user.followers[i]);

      formatedArray.push({
        id: follower.id,
        username: follower.username,
      });
    }

    return formatedArray;
  }

  async listFollowings(id: string): Promise<any[]> {
    const user = await this.findOne(id);

    let formatedArray = [];

    for (var i = 0; i < user.following.length; i++) {
      const follow = await this.findById(user.following[i]);

      formatedArray.push({
        id: follow.id,
        username: follow.username,
      });
    }

    return formatedArray;
  }
}
