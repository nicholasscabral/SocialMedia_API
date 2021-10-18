import { MigrationInterface, QueryRunner } from "typeorm";

export class addPasswordResetToken1634412212652 implements MigrationInterface {
  name = "addPasswordResetToken1634412212652";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "passwordresettoken" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "passwordtokenexpires" TIMESTAMP`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "passwordresettoken"`
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "passwordtokenexpires"`
    );
  }
}
