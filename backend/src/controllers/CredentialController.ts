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
		let response: Credential | string;
		let status: number;

		if(result instanceof Error){
			response = result.message;
			status = 400;
		}else{
			response = result;
			status = 201;
		}

		return res.json(response).status(status);
	}

	async getCredentials(req: Request, res: Response){
		const service = new CredentialService();
		const result = await service.getCredentials();
		
		return res.json(result).status(200);
	}

	async updateCredential(req: Request, res: Response){
		const { id, credential } = req.body;
		const service = new CredentialService();
		const result = await service.updateCredential(id, credential as CredentialType);
		let response: Credential | string;
		let status: number;

		if (result instanceof Error) {
			response = result.message;
			status = 400;
		} else {
			response = result;
			status = 200;
		}

		return res.json(response).status(status);
	}

	async deleteCredential(req: Request, res: Response){
		const { id } = req.body;
		const service = new CredentialService();
		const result = await service.deleteCredential(id);
		let response: Credential | string;
		let status: number;

		if(result instanceof Error){
			response = result.message;
			status = 400;
		}else{
			response = result;
			status = 204;
		}

		return res.json(response).status(status);
	}
}
