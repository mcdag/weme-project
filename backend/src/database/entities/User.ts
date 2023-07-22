import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class User {
	@PrimaryColumn()
		id: string;

	@Column()
		name: string;

	@Column()
		email: string;

	@Column()
		password: string;

	@CreateDateColumn({ name: "created_at"})
		createdAt: Date;

	constructor(){
		if(!this.id) {
			this.id = uuid();
		}
	}
}