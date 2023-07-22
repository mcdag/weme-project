import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEmail1690033797729 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "email",
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
						name: "email",
						type: "varchar",
					},
					{
						name: "url",
						type: "varchar",
					},
					{
						name: "password",
						type: "varchar",
					}
				],
				foreignKeys: [
					{
						name: "fk_email_credential",
						columnNames: ["credential_id"],
						referencedTableName: "credential",
						referencedColumnNames: ["id"]
					}
				]
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("email");
	}
}
