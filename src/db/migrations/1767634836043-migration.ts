import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1767634836043 implements MigrationInterface {
    name = 'Migration1767634836043'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`goal\` (\`idGoal\` int NOT NULL AUTO_INCREMENT, \`goal\` text NOT NULL, \`currentValue\` double NOT NULL, \`totalValue\` double NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`idUser\` int NULL, PRIMARY KEY (\`idGoal\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`revenue\` (\`idRevenue\` int NOT NULL AUTO_INCREMENT, \`date\` text NOT NULL, \`description\` text NOT NULL, \`value\` double NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`idUser\` int NULL, PRIMARY KEY (\`idRevenue\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`expense\` (\`idExpense\` int NOT NULL AUTO_INCREMENT, \`date\` text NOT NULL, \`description\` text NOT NULL, \`value\` double NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`idUser\` int NULL, PRIMARY KEY (\`idExpense\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`amount_to_receive\` (\`idAmountToReceive\` int NOT NULL AUTO_INCREMENT, \`date\` text NOT NULL, \`name\` text NOT NULL, \`description\` text NOT NULL, \`value\` double NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`idUser\` int NULL, PRIMARY KEY (\`idAmountToReceive\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`amount_to_pay\` (\`idAmountToPay\` int NOT NULL AUTO_INCREMENT, \`date\` text NOT NULL, \`name\` text NOT NULL, \`description\` text NOT NULL, \`value\` double NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`idUser\` int NULL, PRIMARY KEY (\`idAmountToPay\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`idUser\` int NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, \`lastName\` text NOT NULL, \`email\` text NOT NULL, \`password\` text NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`idUser\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`goal\` ADD CONSTRAINT \`FK_bb8a351b22141e0428e51069711\` FOREIGN KEY (\`idUser\`) REFERENCES \`user\`(\`idUser\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`revenue\` ADD CONSTRAINT \`FK_58e91c81a7e85ec83c12ab815ee\` FOREIGN KEY (\`idUser\`) REFERENCES \`user\`(\`idUser\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`expense\` ADD CONSTRAINT \`FK_7820a3c411564a422a91b24ef92\` FOREIGN KEY (\`idUser\`) REFERENCES \`user\`(\`idUser\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`amount_to_receive\` ADD CONSTRAINT \`FK_cd9e2a5bb8cd33e38201e32e0df\` FOREIGN KEY (\`idUser\`) REFERENCES \`user\`(\`idUser\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`amount_to_pay\` ADD CONSTRAINT \`FK_e1a9b65754b36dfe4b8c835c967\` FOREIGN KEY (\`idUser\`) REFERENCES \`user\`(\`idUser\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`amount_to_pay\` DROP FOREIGN KEY \`FK_e1a9b65754b36dfe4b8c835c967\``);
        await queryRunner.query(`ALTER TABLE \`amount_to_receive\` DROP FOREIGN KEY \`FK_cd9e2a5bb8cd33e38201e32e0df\``);
        await queryRunner.query(`ALTER TABLE \`expense\` DROP FOREIGN KEY \`FK_7820a3c411564a422a91b24ef92\``);
        await queryRunner.query(`ALTER TABLE \`revenue\` DROP FOREIGN KEY \`FK_58e91c81a7e85ec83c12ab815ee\``);
        await queryRunner.query(`ALTER TABLE \`goal\` DROP FOREIGN KEY \`FK_bb8a351b22141e0428e51069711\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`amount_to_pay\``);
        await queryRunner.query(`DROP TABLE \`amount_to_receive\``);
        await queryRunner.query(`DROP TABLE \`expense\``);
        await queryRunner.query(`DROP TABLE \`revenue\``);
        await queryRunner.query(`DROP TABLE \`goal\``);
    }

}
