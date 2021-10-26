import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  desc: string;

  @Column()
  img: string;

  @Column("simple-array")
  likes: string[];

  @CreateDateColumn({ default: () => "now()" })
  created_at: Date;
}
