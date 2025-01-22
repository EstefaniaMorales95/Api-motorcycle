import { encriptAdapter } from '../../config';
import { JwtAdapter } from '../../config/jwt.adapter';
import { User, UserStatus } from '../../data';
import { CustomError } from '../../domain';
import { LoginUserDTO } from '../../domain/dtos/user/login-user.dto';
import { RegisterUserDTO } from '../../domain/dtos/user/register-user.dto';
import { EmailService } from './email.service';

export class UserService {
	constructor(private readonly emailService: EmailService) {}

	async login(credentials: LoginUserDTO) {
		const user = await this.findUserByEmail(credentials.email);

		const isMatching = encriptAdapter.compare(
			credentials.password,
			user.password,
		);
		if (!isMatching) throw CustomError.unAuthorized('Invalid Credentials');
		const token = await JwtAdapter.generateToken({ id: user.id });
		if (!token) throw CustomError.internalServer('Error while creating JWT');

		return {
			token: token,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
		};
	}

	async register(userData: RegisterUserDTO) {
		const user = new User();

		user.name = userData.name;
		user.email = userData.email;
		user.password = userData.password;
		user.role = userData.role;

		try {
			const dbUser = await user.save();

			await this.senEmailValidationLink(userData.email);

			return {
				id: dbUser.id,
				name: dbUser.name,
				email: dbUser.email,
				role: dbUser.role,
			};
		} catch (error: any) {
			if (error.code === '23505') {
				throw CustomError.badRequest(
					`User with email: ${userData.email} email already exist`,
				);
			}
			throw CustomError.internalServer('Error while creating user');
		}
	}

	async findUserByEmail(email: string) {
		const user = await User.findOne({
			where: {
				email: email,
				status: UserStatus.AVAILABLE,
			},
		});
		if (!user) throw CustomError.notFoud(`User with email: ${email} not found`);
		return user;
	}

	public senEmailValidationLink = async (email: string) => {
		const token = await JwtAdapter.generateToken({ email });
		if (!token) throw CustomError.internalServer('Error getting');
		const link = `https://freckle-wisteria-4f2.notion.site/NODE-GEN-40-15f444f197db8083ae3adb5c2c5ea161 ${token} `;
		const html = `
		<h1> Validate your email </h1>
		<p> Click on the following link to validate your email </p>
		<a href="${link}">Validate
		`;
		const isSent = this.emailService.senEmail({
			to: email,
			subject: 'Validate your account',
			htmlBody: html,
		});
		if (!isSent) throw CustomError.internalServer('Error sending email');

		return true;
	};

	validateEmail = async (token: string) => {
		const payload = await JwtAdapter.validateToken(token);
		if (!payload) throw CustomError.badRequest('Invalid Token');
		const { email } = payload as { email: string };
		if (!email) throw CustomError.internalServer('Email is');

		const user = await User.findOne({ where: { email: email } });

		if (!user) throw CustomError.internalServer('Enail not exist');

		user.status = UserStatus.AVAILABLE;

		try {
			await user.save();
			return {
				message: 'User available',
			};
		} catch (error) {
			throw CustomError.internalServer('Something went very wrong');
		}
	};

	async getUserProfile() {}
}
