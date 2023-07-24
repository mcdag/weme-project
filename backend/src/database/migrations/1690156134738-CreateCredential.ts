import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCredential1690156134738 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "credential",
				columns: [
					{
						name: "id",
						type: "uuid",
						isPrimary: true
					},
					{
						name: "user_id",
						type: "uuid",
					},
					{
						name: "type",
						type: "varchar",
					},
					{
						name: "title",
						type: "varchar",
					},
					{
						name: "email_id",
						type: "uuid",
						isNullable: true,
					},
					{
						name: "credit_card_id",
						type: "uuid",
						isNullable: true,
					},
					{
						name: "created_at",
						type: "timestamp",
						default: "now()"
					}
				],
				foreignKeys: [
					{
						name: "fk_credential_user",
						columnNames: ["user_id"],
						referencedTableName: "user",
						referencedColumnNames: ["id"]
					},
					{
						name: "fk_credential_email",
						columnNames: ["email_id"],
						referencedTableName: "email",
						referencedColumnNames: ["id"]
					},
					{
						name: "fk_credential_credit_card",
						columnNames: ["credit_card_id"],
						referencedTableName: "credit_card",
						referencedColumnNames: ["id"]
					}
				]
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("credential");
	}
}
