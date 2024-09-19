import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1727046759746 implements MigrationInterface {
    name = 'FirstMigration1727046759746'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`genre\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`author\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`familyName\` varchar(255) NOT NULL, \`dateOfBirth\` datetime NOT NULL, \`dateOfDeath\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`book\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`summary\` varchar(255) NOT NULL, \`isbn\` varchar(255) NOT NULL, \`author_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`book_instance\` (\`id\` int NOT NULL AUTO_INCREMENT, \`imprint\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`due_back\` datetime NOT NULL, \`book_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`book_genres_genre\` (\`bookId\` int NOT NULL, \`genreId\` int NOT NULL, INDEX \`IDX_31d658e0af554165f4598158c5\` (\`bookId\`), INDEX \`IDX_83bd32782d44d9db3d68c3f58c\` (\`genreId\`), PRIMARY KEY (\`bookId\`, \`genreId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`book\` ADD CONSTRAINT \`FK_24b753b0490a992a6941451f405\` FOREIGN KEY (\`author_id\`) REFERENCES \`author\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`book_instance\` ADD CONSTRAINT \`FK_cdd368951566cce982e6e7b412f\` FOREIGN KEY (\`book_id\`) REFERENCES \`book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`book_genres_genre\` ADD CONSTRAINT \`FK_31d658e0af554165f4598158c55\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`book_genres_genre\` ADD CONSTRAINT \`FK_83bd32782d44d9db3d68c3f58c1\` FOREIGN KEY (\`genreId\`) REFERENCES \`genre\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book_genres_genre\` DROP FOREIGN KEY \`FK_83bd32782d44d9db3d68c3f58c1\``);
        await queryRunner.query(`ALTER TABLE \`book_genres_genre\` DROP FOREIGN KEY \`FK_31d658e0af554165f4598158c55\``);
        await queryRunner.query(`ALTER TABLE \`book_instance\` DROP FOREIGN KEY \`FK_cdd368951566cce982e6e7b412f\``);
        await queryRunner.query(`ALTER TABLE \`book\` DROP FOREIGN KEY \`FK_24b753b0490a992a6941451f405\``);
        await queryRunner.query(`DROP INDEX \`IDX_83bd32782d44d9db3d68c3f58c\` ON \`book_genres_genre\``);
        await queryRunner.query(`DROP INDEX \`IDX_31d658e0af554165f4598158c5\` ON \`book_genres_genre\``);
        await queryRunner.query(`DROP TABLE \`book_genres_genre\``);
        await queryRunner.query(`DROP TABLE \`book_instance\``);
        await queryRunner.query(`DROP TABLE \`book\``);
        await queryRunner.query(`DROP TABLE \`author\``);
        await queryRunner.query(`DROP TABLE \`genre\``);
    }

}
