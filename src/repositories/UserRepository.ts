import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
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

  async findInArray(id: string, array: string[]): Promise<number> {
    for (var i = 0; i < array.length; i++) {
      if (id == array[i]) return i;
    }

    return -1;
  }
}
