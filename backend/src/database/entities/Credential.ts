import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";


@Entity()
export class Credential {
	@PrimaryColumn()
		id: string;

	@Column({ name: "user_id"})
		userId: string;

	@ManyToOne(()=>User)
	@JoinColumn({ name: "user_id"})
		user: User;

	@Column()
		type: string;

	@Column()
		title: string;

	@CreateDateColumn({ name: "created_at"})
		createdAt: Date;

	constructor(){
		if(!this.id) {
			this.id = uuid();
		}
	}
}