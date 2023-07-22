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

		const credential = repo.create({user, type, title});

		await repo.save(credential);

		switch (type) {
		case "email":
			await new EmailService().createEmail(credential, credentialEmail as EmailType);
			break;
		case "creditCard":
			await new CreditCardService().createCreditCard(credential, credentialCreditCard as CreditCardType);
			break;
		default:
			break;
		}

		return credential;
	}

	async getCredentials(){

	}

	async updateCredential(id: string, {type, title, credentialEmail, credentialCreditCard}: CredentialType): Promise<Credential | Error> {
		const repo = dataSource.getRepository(Credential);

		const credential = await repo.findOne({ where: {id} });
		
		if(!credential) {
			return new Error("There is no credential with that id");
		}

		credential.type = type ? type : credential.type;
		credential.title = title ? title : credential.title;

		if(type == "email") {
			const email = await dataSource.getRepository(Email).findOne({where: { credentialId: id}});
			await new EmailService().updateEmail(email, credentialEmail as EmailType);

		} else if(type == "creditCard") {
			const creditCard = await dataSource.getRepository(CreditCard).findOne({ where: { credentialId: id}});
			await new CreditCardService().updateCreditCard(creditCard, credentialCreditCard as CreditCardType);
		}

		repo.save(credential);
		return credential;
	}

	async deleteCredential(id: string): Promise<string | Error> {
		const repo = dataSource.getRepository(CreditCard);

		const creditCard = await repo.findOne({ where: {id} });
		if(!creditCard) {
			return new Error("There is no CreditCard with that id");
		}
		
		await repo.delete({id});

		return id;
	}
}