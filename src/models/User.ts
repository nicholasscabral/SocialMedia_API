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

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column("simple-array")
  posts: string[];

  @Column("simple-array")
  followers: string[];

  @Column("simple-array")
  following: string[];

  @CreateDateColumn({ default: () => "now()", select: false })
  created_at: Date;
}
