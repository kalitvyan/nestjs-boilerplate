import { MigrationInterface, QueryRunner } from 'typeorm'

export class Init1689232022662 implements MigrationInterface {
    name = 'Init1689232022662'

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `)
        await queryRunner.query(`
            CREATE TABLE "wallet" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "user_id" integer NOT NULL,
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
                "wallet_id" uuid NOT NULL,
                CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id")
            )
        `)
        await queryRunner.query(`
            ALTER TABLE "wallet"
            ADD CONSTRAINT "FK_72548a47ac4a996cd254b082522" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
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
            ALTER TABLE "wallet" DROP CONSTRAINT "FK_72548a47ac4a996cd254b082522"
        `)
        await queryRunner.query(`
            DROP TABLE "transaction"
        `)
        await queryRunner.query(`
            DROP TABLE "wallet"
        `)
        await queryRunner.query(`
            DROP TABLE "user"
        `)
    }
}
