import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCreditCard1690033791063 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "credit_card",
				columns: [
					{
						name: "id",
						type: "uuid",
						isPrimary: true
					},
					{
						name: "credential_id",
						type: "uuid",
					},
					{
						name: "number",
						type: "varchar",
					},
					{
						name: "name",
						type: "varchar",
					},
					{
						name: "cvv",
						type: "varchar",
					},
					{
						name: "expiration_date",
						type: "varchar",
					},
					{
						name: "password",
						type: "varchar",
					}
				],
				foreignKeys: [
					{
						name: "fk_credit_card_credential",
						columnNames: ["credential_id"],
						referencedTableName: "credential",
						referencedColumnNames: ["id"]
					}
				]
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("credit_card");
	}
}
