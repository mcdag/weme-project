import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";
import { Email } from "./Email";
import { CreditCard } from "./CreditCard";


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

	@Column({ name: "email_id", nullable: true})
		emailId: string;

	@OneToOne(()=>Email, { onDelete: "CASCADE" })
	@JoinColumn({ name: "email_id"})
		email: Email;
	
	@Column({ name: "credit_card_id", nullable: true})
		creditCardId: string;

	@OneToOne(()=>CreditCard, { onDelete: "CASCADE" })
	@JoinColumn({ name: "credit_card_id"})
		creditCard: CreditCard;

	@CreateDateColumn({ name: "created_at"})
		createdAt: Date;

	constructor(){
		if(!this.id) {
			this.id = uuid();
		}
	}
}