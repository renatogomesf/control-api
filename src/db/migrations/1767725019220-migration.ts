import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1767725019220 implements MigrationInterface {
    name = 'Migration1767725019220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "goal" ("idGoal" SERIAL NOT NULL, "goal" text NOT NULL, "currentValue" double precision NOT NULL, "totalValue" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "idUser" integer, CONSTRAINT "PK_55f0d6cde45161a1bf85f87b10d" PRIMARY KEY ("idGoal"))`);
        await queryRunner.query(`CREATE TABLE "revenue" ("idRevenue" SERIAL NOT NULL, "date" text NOT NULL, "description" text NOT NULL, "value" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "idUser" integer, CONSTRAINT "PK_73be0a8590b29a1464a14448378" PRIMARY KEY ("idRevenue"))`);
        await queryRunner.query(`CREATE TABLE "expense" ("idExpense" SERIAL NOT NULL, "date" text NOT NULL, "description" text NOT NULL, "value" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "idUser" integer, CONSTRAINT "PK_e7a129dbf5a649770654af60bf1" PRIMARY KEY ("idExpense"))`);
        await queryRunner.query(`CREATE TABLE "amount_to_receive" ("idAmountToReceive" SERIAL NOT NULL, "date" text NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "value" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "idUser" integer, CONSTRAINT "PK_253854218cf9992335e948433f3" PRIMARY KEY ("idAmountToReceive"))`);
        await queryRunner.query(`CREATE TABLE "amount_to_pay" ("idAmountToPay" SERIAL NOT NULL, "date" text NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "value" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "idUser" integer, CONSTRAINT "PK_63635d990e3c1f22e35cd9787d5" PRIMARY KEY ("idAmountToPay"))`);
        await queryRunner.query(`CREATE TABLE "user" ("idUser" SERIAL NOT NULL, "name" text NOT NULL, "lastName" text NOT NULL, "email" character varying(150) NOT NULL, "password" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_c815460ecf7189b12a7ddd2d635" PRIMARY KEY ("idUser"))`);
        await queryRunner.query(`ALTER TABLE "goal" ADD CONSTRAINT "FK_bb8a351b22141e0428e51069711" FOREIGN KEY ("idUser") REFERENCES "user"("idUser") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "revenue" ADD CONSTRAINT "FK_58e91c81a7e85ec83c12ab815ee" FOREIGN KEY ("idUser") REFERENCES "user"("idUser") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "expense" ADD CONSTRAINT "FK_7820a3c411564a422a91b24ef92" FOREIGN KEY ("idUser") REFERENCES "user"("idUser") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "amount_to_receive" ADD CONSTRAINT "FK_cd9e2a5bb8cd33e38201e32e0df" FOREIGN KEY ("idUser") REFERENCES "user"("idUser") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "amount_to_pay" ADD CONSTRAINT "FK_e1a9b65754b36dfe4b8c835c967" FOREIGN KEY ("idUser") REFERENCES "user"("idUser") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "amount_to_pay" DROP CONSTRAINT "FK_e1a9b65754b36dfe4b8c835c967"`);
        await queryRunner.query(`ALTER TABLE "amount_to_receive" DROP CONSTRAINT "FK_cd9e2a5bb8cd33e38201e32e0df"`);
        await queryRunner.query(`ALTER TABLE "expense" DROP CONSTRAINT "FK_7820a3c411564a422a91b24ef92"`);
        await queryRunner.query(`ALTER TABLE "revenue" DROP CONSTRAINT "FK_58e91c81a7e85ec83c12ab815ee"`);
        await queryRunner.query(`ALTER TABLE "goal" DROP CONSTRAINT "FK_bb8a351b22141e0428e51069711"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "amount_to_pay"`);
        await queryRunner.query(`DROP TABLE "amount_to_receive"`);
        await queryRunner.query(`DROP TABLE "expense"`);
        await queryRunner.query(`DROP TABLE "revenue"`);
        await queryRunner.query(`DROP TABLE "goal"`);
    }

}
