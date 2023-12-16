import { MigrationInterface, QueryRunner } from 'typeorm';

export class PetsMigration1702702335735 implements MigrationInterface {
  name = 'PetsMigration1702702335735';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pet" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "ownerId" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "test" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_user"("id", "name", "test") SELECT "id", "name", "test" FROM "user"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_pet" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "ownerId" integer, CONSTRAINT "FK_20acc45f799c122ec3735a3b8b1" FOREIGN KEY ("ownerId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_pet"("id", "name", "ownerId") SELECT "id", "name", "ownerId" FROM "pet"`,
    );
    await queryRunner.query(`DROP TABLE "pet"`);
    await queryRunner.query(`ALTER TABLE "temporary_pet" RENAME TO "pet"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "pet" RENAME TO "temporary_pet"`);
    await queryRunner.query(
      `CREATE TABLE "pet" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "ownerId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "pet"("id", "name", "ownerId") SELECT "id", "name", "ownerId" FROM "temporary_pet"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_pet"`);
    await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "test" varchar NOT NULL, "test2" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "user"("id", "name", "test") SELECT "id", "name", "test" FROM "temporary_user"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_user"`);
    await queryRunner.query(`DROP TABLE "pet"`);
  }
}
