import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
	async createUser(req: Request, res: Response){
		const { name, email, password } = req.body;
		const service = new UserService();
		const result = await service.createUser({name, email, password});

		if(result instanceof Error){
			return res.sendStatus(400).json(result.message);
		}

		res.send(201).json(result);
		return;
	}

	async getUserLogin(req: Request, res: Response){
		const { email, password } = req.body;
		const service = new UserService();
		const result = await service.getUserLogin({email, password});

		if(result instanceof Error){
			return res.sendStatus(400).json(result.message);
		}

		res.send(200).json(result);
		return;
	}
}