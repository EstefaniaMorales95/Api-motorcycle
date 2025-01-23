import { encriptAdapter } from '../../config';
import { JwtAdapter } from '../../config/jwt.adapter';
import { User, UserStatus } from '../../data';

import { CreateUserDTO, CustomError } from '../../domain';
import { UpdateUserDTO } from '../../domain/dtos/users/update-user.dto';

export class UsersService {
	async findOne(id: string) {
		const user = await User.findOne({
			where: {
				status: UserStatus.AVAILABLE,
				id: id,
			},
		});
		if (!user) {
			throw CustomError.notFoud('User not found');
		}

		return user; // Devolver el usuario encontrado
	}

	async findAll() {
		try {
			const users = await User.find({
				where: {
					status: UserStatus.AVAILABLE,
				},
			});
			return users;
		} catch (error) {
			throw CustomError.internalServer('Error fetching users');
		}
	}

	async create(data: CreateUserDTO) {
		const user = new User();

		user.name = data.name;
		user.email = data.email;
		user.password = data.password;
		user.role = data.role;

		try {
			return await user.save();
		} catch (error) {
			CustomError.internalServer('Error creting user.');
		}
	}

	async update(id: string, data: UpdateUserDTO) {
		const user = await this.findOne(id);

		user.name = data.name;
		user.email = data.email;

		try {
			await user.save();
			return {
				message: 'User Updated',
			};
		} catch (error) {
			throw CustomError.internalServer('Error updating user');
		}
	}

	async disable(id: string) {
		const user = await this.findOne(id);

		user.status = UserStatus.DISABLED;

		try {
			await user.save();
			return { ok: true };
		} catch (error) {
			throw CustomError.internalServer('Error deleting user');
		}
	}
	async login(email: string, password: string) {
		const user = await this.findUserByEmail(email);
		const isMatching = await encriptAdapter.compare(password, user.password);

		if (!isMatching) throw CustomError.unAuthorized('Invalid Credentials');

		const token = await JwtAdapter.generateToken({ id: user.id });
		if (!token) throw CustomError.internalServer('Error generating token');

		return {
			token,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
		};
	}

	async findUserByEmail(email: string) {
		const user = await User.findOne({
			where: {
				email,
				status: UserStatus.AVAILABLE,
			},
		});
		if (!user) {
			throw CustomError.notFoud('User not found');
		}
		return user;
	}
}
