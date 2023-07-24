import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEmail1690156063984 implements MigrationInterface {
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
		await queryRunner.dropTable("email");
	}
}
