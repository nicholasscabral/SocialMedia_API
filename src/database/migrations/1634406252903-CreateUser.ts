import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1634406252903 implements MigrationInterface {
  name = "CreateUser1634406252903";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "users" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
             "username" character varying NOT NULL,
             "email" character varying NOT NULL,
             "password" character varying NOT NULL,
             "profilePicture" character varying,
             "followers" text NOT NULL,
             "following" text NOT NULL,
             "created_at" TIMESTAMP NOT NULL DEFAULT now(),
             CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"),
             CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
             CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
