import { regularExp } from '../../../config';

export class LoginUserDTO {
	constructor(public email: string, public password: string) {}

	static login(object: { [key: string]: any }): {
		error?: string;
		data?: LoginUserDTO;
	} {
		const { email, password } = object;

		// Validación del email
		if (!email) return { error: 'Email is required' };
		if (!regularExp.email.test(email)) return { error: 'Invalid Email' };

		// Validación del password
		if (!password) return { error: 'Missing password' };
		if (!regularExp.password.test(password)) {
			return {
				error:
					'The password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, and one special character',
			};
		}

		// Si todo es válido, devolver instancia de LoginUserDTO
		return { data: new LoginUserDTO(email, password) };
	}
}
