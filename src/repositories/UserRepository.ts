import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async verify(username: string, email: string) {
    const usernameInUse = await this.findOne({ username });

    if (usernameInUse)
      return { error: true, message: "username already in use" };

    const emailInUse = await this.findOne({ email });

    if (emailInUse) return { error: true, message: "email already in use" };

    return { error: false };
  }

  async exists(id: string): Promise<boolean> {
    return (await this.findById(id)) != undefined ? true : false;
  }

  async findById(id: string): Promise<User> {
    return this.findOne(id);
  }

  async findByUsername(username: string): Promise<User> {
    return await this.findOne({ username: username });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.findOne({ email: email });
  }

  async findPassword(username: string) {
    const response = await this.createQueryBuilder("user")
      .select("id, password")
      .where({ username: username })
      .getRawOne();

    return { id: response.id, hashedPassword: response.password };
  }

  async findToken(email: string) {
    const response = await this.createQueryBuilder("user")
      .select("passwordresettoken, passwordtokenexpires")
      .where({ email: email })
      .getRawOne();

    console.log(response);

    return {
      passwordresettoken: response.passwordresettoken,
      passwordtokenexpires: response.passwordtokenexpires,
    };
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

  async findWithUnselected(id: string) {
    const user = await this.createQueryBuilder()
      .select("*")
      .where({ id })
      .getRawOne();

    return user;
  }
}
