import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { User } from "../database/entities/User";

export class UserController {
	async createUser(req: Request, res: Response){
		const { name, email, password } = req.body;
		const result = await new UserService().createUser({name, email, password});
		let response: User | string;
		let status: number;

		if(result instanceof Error){
			response = result.message;
			status = 400;
		} else {
			response = result;
			status = 201;
		}

		return res.status(status).send(response);
	}

	async getUserLogin(req: Request, res: Response){
		const { email, password } = req.body;
		const result = await new UserService().getUserLogin({email, password});
		let response: User | string;
		let status: number;


		if(result instanceof Error){
			response = result.message;
			status = 400;
		} else {
			response = result;
			status = 200;
		}

		return res.send(response).status(status);
	}
}