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
			const newUser = await user.save();

			return {
				id: newUser.id,
				name: newUser.name,
				email: newUser.email,
				role: newUser.role,
			};
		} catch (error) {
			console.log(error);
			throw CustomError.internalServer('Error creating user');
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
}
