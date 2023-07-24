import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCreditCard1690156099184 implements MigrationInterface {
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
					},
					{
						name: "created_at",
						type: "timestamp",
						default: "now()"
					}
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("credit_card");
	}
}
