import { Column, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Credential } from "./Credential";

export class CreditCard {
	@PrimaryColumn()
		id: string;

	@Column()
		credential_id: string;

	@ManyToOne(()=>Credential)
	@JoinColumn({ name: "credential_id"})
		credential: Credential;

	@Column()
		number: string;

	@Column()
		name: string;

	@Column()
		cvv: string;

	@Column()
		expiration_data: string;
	
	@Column()
		password: string;

	constructor(){
		if(!this.id) {
			this.id = uuid();
		}
	}
}