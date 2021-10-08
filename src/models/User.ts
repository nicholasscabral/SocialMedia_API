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

  @Column("simple-array", { default: [] })
  posts: string[];

  @Column("simple-array", { default: [] })
  followers: string[];

  @Column("simple-array", { default: [] })
  following: string[];

  @CreateDateColumn({ default: new Date() })
  created_at: Date;
}
