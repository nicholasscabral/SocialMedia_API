import {MigrationInterface, QueryRunner} from "typeorm";

export class addUpdateColumn1635052324719 implements MigrationInterface {
    name = 'addUpdateColumn1635052324719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
    }

}
