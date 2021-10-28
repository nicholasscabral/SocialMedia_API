import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class addUserPostFK1635291569749 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "posts",
      new TableForeignKey({
        name: "FKPostUserId",
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        columnNames: ["user_id"],
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("posts", "FKPostUserId");
  }
}
