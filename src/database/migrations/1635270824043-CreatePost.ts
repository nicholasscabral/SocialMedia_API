import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePost1635270824043 implements MigrationInterface {
  name = "CreatePost1635270824043";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(),
       "desc" character varying NOT NULL,
       "img" character varying NOT NULL,
       "likes" text NOT NULL,
       "created_at" TIMESTAMP NOT NULL DEFAULT now(),
       CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "posts"`);
  }
}
