import {
  Column,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

Entity();
class User {
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
  followers: string[];

  @Column("simple-array", { default: [] })
  following: string[];

  @CreateDateColumn({ default: new Date() })
  created_at: Date;
}

export { User };
