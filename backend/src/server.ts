import "reflect-metadata";
import express from "express";
import dataSource from "./ormconfig";
import * as dotenv from "dotenv";
dotenv.config();


dataSource.initialize()
	.then(async () => {
		console.log("Datasource Initialize");
	});
	
const server = express();
server.listen(process.env.SERVER_PORT, () => console.log("server is running!"));