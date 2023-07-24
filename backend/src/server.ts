import "reflect-metadata";
import express from "express";
import dataSource from "./ormconfig";
import * as dotenv from "dotenv";
import { routes } from "./routes";
import cors from "cors";
dotenv.config();


dataSource.initialize()
	.then(async () => {
		console.log("Datasource Initialize");
	});
	
const server = express();
server.use(express.json());
server.use(cors());
server.use(routes);

server.listen(process.env.SERVER_PORT, () => console.log("server is running!"));