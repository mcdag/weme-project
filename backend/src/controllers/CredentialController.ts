import { Request, Response } from "express";
import { CredentialService } from "../services/CredentialService";

export type CredentialType = {
	userId?: string;
	type: string;
	title: string;
	credentialEmail: {
		email: string;
		url: string;
		password: string;
	} | null;
	credentialCreditCard?: {
		number: string;
		name: string;
		cvv: string;
		expirationDate: string;
		password: string;
	} | null;
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
		} else{
			response = result;
			status = 201;
		}

		return res.send(response).status(status);
	}

	async getCredentials(req: Request, res: Response){
		const { id } = req.params;
		const service = new CredentialService();
		const result = await service.getCredentials(id);
		
		return res.send(result).status(200);
	}

	async getCredential(req: Request, res: Response){
		const { id } = req.params;
		const service = new CredentialService();
		const result = await service.getCredential(id);
		
		return res.send(result).status(200);
	}

	async updateCredential(req: Request, res: Response){
		const { id } = req.params;
		const service = new CredentialService();
		const result = await service.updateCredential(id, req.body as CredentialType);
		let response: Credential | string;
		let status: number;

		if (result instanceof Error) {
			response = result.message;
			status = 400;
		} else {
			response = result;
			status = 200;
		}

		return res.send(response).status(status);
	}

	async deleteCredential(req: Request, res: Response){
		const { id } = req.params;
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

		return res.send(response).status(status);
	}
}
