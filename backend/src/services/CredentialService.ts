import dataSource from "../ormconfig";
import { User } from "../database/entities/User";
import { Credential } from "../database/entities/Credential";
import { CreditCardService, CreditCardType } from "./CreditCardService";
import { EmailService, EmailType } from "./EmailService";
import { Email } from "../database/entities/Email";
import { CreditCard } from "../database/entities/CreditCard";
import { CredentialType } from "../controllers/CredentialController";

export class CredentialService {
	async createCredential({userId, type, title, credentialEmail, credentialCreditCard}: CredentialType): Promise<Credential | Error> {
		const repo = dataSource.getRepository(Credential);
		const user = await dataSource.getRepository(User).findOne({ where: {id: userId} });

		if(!user) {
			return new Error("There is no user with that id");
		}
		let credential: Credential;

		if(credentialEmail) {
			const email =  await new EmailService().createEmail(credentialEmail as EmailType);
			if(email instanceof Error) {
				return new Error(email.message);
			}
			credential = repo.create({user, type, title, email});
		} else if (credentialCreditCard) {
			const creditCard = await new CreditCardService().createCreditCard(credentialCreditCard as CreditCardType);
			if(creditCard instanceof Error) {
				return new Error(creditCard.message);
			}
			credential = repo.create({user, type, title, creditCard});
		} else {
			return new Error("Credential could not be saved, because there was no email or credit card to save");
		}

		await repo.save(credential);

		return credential;
	}

	async getCredentials(id: string){
		const repo = dataSource.getRepository(Credential);
		const result =  await repo.find({relations: ["email", "creditCard"], where: { userId: id}});
		
		return result;
	}

	async getCredential(id: string){
		const repo = dataSource.getRepository(Credential);
		const result =  await repo.findOne({where: { id: id}});
		
		return result;
	}

	async updateCredential(id: string, {type, title, credentialEmail, credentialCreditCard}: CredentialType): Promise<Credential | Error> {
		const repo = dataSource.getRepository(Credential);
		const credential = await repo.findOne({ where: {id} });

		if(!credential) {
			return new Error("There is no credential with that id");
		}
		
		credential.type = type ? type : credential.type;
		credential.title = title ? title : credential.title;

		let cred: Email | CreditCard | Error;

		if(credentialEmail) {
			const email = await dataSource.getRepository(Email).findOne({where: { id: credential.emailId }});
			cred = await new EmailService().updateEmail(email, credentialEmail as EmailType);
		} else if(credentialCreditCard) {
			const creditCard = await dataSource.getRepository(CreditCard).findOne({ where: { id: credential.creditCardId }});
			cred = await new CreditCardService().updateCreditCard(creditCard, credentialCreditCard as CreditCardType);
		}

		if(cred instanceof Error) {
			return new Error(cred.message);
		}

		repo.save(credential);
		return credential;
	}

	async deleteCredential(id: string): Promise<string | Error> {
		const repo = dataSource.getRepository(Credential);
		const credential = await repo.findOne({where: { id }});
		
		let cred: string | Error;

		if(!credential) {
			return new Error("There is no credential with that id");
		}
		
		await repo.delete({id});

		if(credential.emailId) {
			cred = await new EmailService().deleteEmail(credential.emailId);

		} else if(credential.creditCardId) {
			cred = await new CreditCardService().deleteCreditCard(credential.creditCardId);
		}

		if(cred instanceof Error) {
			return new Error(cred.message);
		}

		return id;
	}
}