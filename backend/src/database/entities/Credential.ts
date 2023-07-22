import { Column, CreateDateColumn, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";

export class Credential {
	@PrimaryColumn()
		id: string;

	@Column()
		user_id: string;

	@ManyToOne(()=>User)
	@JoinColumn({ name: "user_id"})
		user: User;

	@Column()
		type: string;

	@Column()
		title: string;

	@CreateDateColumn()
		created_at: Date;

	constructor(){
		if(!this.id) {
			this.id = uuid();
		}
	}
}