import { MigrationInterface, QueryRunner } from "typeorm";

export class TableCustomer1711731335908 implements MigrationInterface {
    name = 'TableCustomer1711731335908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`customer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(45) NOT NULL, \`lastname\` varchar(45) NOT NULL, \`email\` varchar(100) NULL, \`phoneNumber\` varchar(15) NULL, \`address\` varchar(255) NULL, \`deletedAt\` datetime(6) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`customer\``);
    }

}
