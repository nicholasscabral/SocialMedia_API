import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column("simple-array")
  posts: string[];

  @Column("simple-array")
  followers: string[];

  @Column("simple-array")
  following: string[];

  @CreateDateColumn({ default: () => "now()" })
  created_at: Date;
}
