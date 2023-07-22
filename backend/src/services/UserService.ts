import dataSource from "../ormconfig";
import { User } from "../database/entities/User";

type UserRegister = {
	name: string;
	email: string;
	password: string;
}

type UserLogin = {
	email: string;
	password: string;
}

export class UserService {
	async createUser({name, email, password}: UserRegister): Promise<User | Error> {
		const repo = dataSource.getRepository(User);

		if(await repo.findOne({ where: {email} })) {
			return new Error("Email already registered");
		}

		const user = repo.create({
			name,
			email,
			password
		});

		await repo.save(user);
		
		return user;
	}

	async getUserLogin({email, password}: UserLogin): Promise<User | Error> {
		const repo = dataSource.getRepository(User);

		const user = await repo.findOne({ where: {email} });

		if(user.password != password) {
			return new Error("Passwords do not match");
		}

		return user;
	}
}