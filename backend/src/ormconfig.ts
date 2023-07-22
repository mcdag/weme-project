import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();

export default new DataSource(
	{
		type: "postgres",
		host: process.env.TYPEORM_HOST,
		port: parseInt(process.env.TYPEORM_PORT),
		username: process.env.TYPEORM_USERNAME,
		password: process.env.TYPEORM_PASSWORD,
		database: process.env.TYPEORM_DATABASE,
		name: "default",
		entities: [process.env.TYPEORM_ENTITIES],
		migrations: [process.env.TYPEORM_MIGRATIONS],
	}
);


