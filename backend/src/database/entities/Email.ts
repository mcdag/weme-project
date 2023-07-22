import { Column, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Credential } from "./Credential";

export class Email {
	@PrimaryColumn()
		id: string;

	@Column()
		credential_id: string;

	@ManyToOne(()=>Credential)
	@JoinColumn({ name: "credential_id"})
		credential: Credential;

	@Column()
		email: string;

	@Column()
		name: string;

	@Column()
		password: string;

	constructor(){
		if(!this.id) {
			this.id = uuid();
		}
	}
}