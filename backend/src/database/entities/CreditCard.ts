import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Credential } from "./Credential";


@Entity()
export class CreditCard {
	@PrimaryColumn()
		id: string;

	@Column({ name: "credential_id"})
		credentialId: string;

	@ManyToOne(()=>Credential)
	@JoinColumn({ name: "credential_id"})
		credential: Credential;

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