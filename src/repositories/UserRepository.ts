import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findById(id: string): Promise<User> {
    return this.findOne(id);
  }
}
