import { MigrationInterface, QueryRunner } from 'typeorm'

export class WalletAndTransaction1689147478118 implements MigrationInterface {
    name = 'WalletAndTransaction1689147478118'

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "wallet" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id")
            )
        `)
        await queryRunner.query(`
            CREATE TABLE "transaction" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "type" character varying NOT NULL,
                "amount" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "wallet_id" uuid,
                CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id")
            )
        `)
        await queryRunner.query(`
            ALTER TABLE "transaction"
            ADD CONSTRAINT "FK_08081d10759ec250c557cebd81a" FOREIGN KEY ("wallet_id") REFERENCES "wallet"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `)
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "transaction" DROP CONSTRAINT "FK_08081d10759ec250c557cebd81a"
        `)
        await queryRunner.query(`
            DROP TABLE "transaction"
        `)
        await queryRunner.query(`
            DROP TABLE "wallet"
        `)
    }
}
