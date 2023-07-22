import { Request, Response } from "express";
import { CredentialService } from "../services/CredentialService";

export type CredentialType = {
	userId?: string;
	type: string;
	title: string;
	credentialEmail?: {
		email: string;
		url: string;
		password: string;
	},
	credentialCreditCard?: {
		number: string;
		name: string;
		cvv: string;
		expirationDate: string;
		password: string;
	}
}

export class CredentialController {

	async createCredential(req: Request, res: Response){
		const service = new CredentialService();
		const result = await service.createCredential(req.body as CredentialType);

		if(result instanceof Error){
			return res.sendStatus(400).json(result.message);
		}

		res.send(201).json(result);
		return;
	}

	async getCredentials(req: Request, res: Response){
		const service = new CredentialService();
		const result = await service.getCredentials();
		
		res.send(200).json(result);
		return;
	}

	async updateCredential(req: Request, res: Response){
		const { id, credential } = req.body;
		const service = new CredentialService();
		const result = await service.updateCredential(id, credential as CredentialType);

		if(result instanceof Error){
			return res.sendStatus(400).json(result.message);
		}

		res.send(200).json(result);
		return;
	}

	async deleteCredential(req: Request, res: Response){
		const { id } = req.body;
		const service = new CredentialService();
		const result = await service.deleteCredential(id);

		if(result instanceof Error){
			return res.sendStatus(400).json(result.message);
		}

		res.send(204).json(result);
		return;
	}
}
