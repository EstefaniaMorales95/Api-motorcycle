import { regularExp } from '../../../config';
import { UserRole } from '../../../data';

export class CreateUserDTO {
	constructor(
		public name: string,
		public email: string,
		public password: string,
		public role: UserRole,
	) {}

	static create(object: { [key: string]: any }): [string?, CreateUserDTO?] {
		const { name, email, password, role } = object;

		if (!name) return ['name is required'];
		if (!email) return ['Email is required'];
		if (!regularExp.email.test(email)) return ['Invalid Email'];
		if (!password) return ['Missing password'];
		if (!regularExp.password.test(password))
			return [
				'The password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, and one special',
			];

		if (!role) return ['Missing role'];
		return [undefined, new CreateUserDTO(name, email, password, role)];
	}
}
