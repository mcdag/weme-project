import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";


@Entity()
export class CreditCard {
	@PrimaryColumn()
		id: string;

	@Column()
		number: string;

	@Column()
		name: string;

	@Column()
		cvv: string;

	@Column({ name: "expiration_date"})
		expirationDate: string;
	
	@Column()
		password: string;

	constructor(){
		if(!this.id) {
			this.id = uuid();
		}
	}
}