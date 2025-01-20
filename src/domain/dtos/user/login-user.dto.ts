import { regularExp } from '../../../config';

export class LoginUserDTO {
	constructor(public email: string, public password: string) {}

	static create(object: { [key: string]: any }): [string?, LoginUserDTO?] {
		const { email, password } = object;

		if (!email) return ['Email is required'];
		if (!regularExp.email.test(email)) return ['Invalid Email'];
		if (!password) return ['Missing password'];
		if (!regularExp.password.test(password))
			return [
				'The password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, and one special',
			];

		return [undefined, new LoginUserDTO(email, password)];
	}
}
