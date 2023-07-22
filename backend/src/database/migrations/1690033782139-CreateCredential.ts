import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCredential1690033782139 implements MigrationInterface {

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
					}
				]
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("credential");
	}
}
