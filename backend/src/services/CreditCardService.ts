import { CreditCard } from "../database/entities/CreditCard";
import dataSource from "../ormconfig";

export type CreditCardType = {
	number: string;
	name: string;
	cvv: string;
	expirationDate: string;
	password: string;
}

export class CreditCardService {
	async createCreditCard({number, name, cvv, expirationDate, password}: CreditCardType): Promise<CreditCard | Error> {
		const repo = dataSource.getRepository(CreditCard);

		const creditCard = repo.create({
			number,
			name,
			cvv,
			expirationDate,
			password
		});

		await repo.save(creditCard);

		if(!creditCard.id) {
			return new Error("Credit card could not be saved");
		}
		
		return creditCard;
	}

	async updateCreditCard(creditCard: CreditCard, {number, name, cvv, expirationDate, password}: CreditCardType): Promise<CreditCard | Error> {
		const repo = dataSource.getRepository(CreditCard);

		if(!creditCard) {
			return new Error("There is no credit card with that id");
		}

		creditCard.number = number ? number : creditCard.number;
		creditCard.name = name ? name : creditCard.name;
		creditCard.cvv = cvv ? cvv : creditCard.cvv;
		creditCard.expirationDate = expirationDate ? expirationDate : creditCard.expirationDate;
		creditCard.password = password ? password : creditCard.password;

		repo.save(creditCard);
		return creditCard;
	}

	async deleteCreditCard(id: string): Promise<string | Error> {
		const repo = dataSource.getRepository(CreditCard);

		const mail = await repo.findOne({ where: {id} });
		if(!mail) {
			return new Error("There is no CreditCard with that id");
		}
		
		await repo.delete({id});

		return id;
	}
}