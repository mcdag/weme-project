import { Email } from "../database/entities/Email";
import dataSource from "../ormconfig";

export type EmailType = {
	email: string;
	url: string;
	password: string;
}

export class EmailService {
	async createEmail({email, url, password}: EmailType): Promise<Email | Error> {
		const repo = dataSource.getRepository(Email);

		const mail = repo.create({
			email,
			url,
			password
		});

		await repo.save(mail);

		if(!mail.id) {
			return new Error("Email could not be saved");
		}

		return mail;
	}

	async updateEmail(mail: Email, {email, url, password}: EmailType): Promise<Email | Error> {
		const repo = dataSource.getRepository(Email);

		if(!mail) {
			return new Error("There is no email with that id");
		}

		mail.email = email ? email : mail.email;
		mail.url = url ? url : mail.url;
		mail.password = password ? password : mail.password;

		repo.save(mail);
		return mail;
	}

	async deleteEmail(id: string): Promise<string | Error> {
		const repo = dataSource.getRepository(Email);

		const mail = await repo.findOne({ where: {id} });
		if(!mail) {
			return new Error("There is no email with that id");
		}
		
		await repo.delete({id});

		return id;
	}
}