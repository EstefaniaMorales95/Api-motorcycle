import { User } from '../../data';

import { CreateUserDTO, CustomError } from '../../domain';

export class UsersService {
	constructor() {}

	async findAllUsers() {
		try {
			return await User.find();
		} catch (error) {
			throw CustomError.notFoud('Error finding a user by their id');
		}
	}

	async findOne(id: string) {
		const user = await User.findOne({
			where: {
				id,
				status: true,
			},
		});
		if (!user) {
			throw CustomError.notFoud('User not found'); // Mejor que 'Post not found', ya que se refiere a un usuario
		}

		return user; // Devolver el usuario encontrado
	}

	async createUser(data: CreateUserDTO) {
		const user = new User();

		user.name = userData.name;
		user.email = userData.email;
		user.password = userData.password;
		user.role = userData.role;
		user.status = userData.status;
		try {
			return await user.save();
		} catch (error) {
			throw CustomError.badRequest('Error creating user');
		}
	}

	async updateUser(id: string) {
		// Buscar el usuario existente por ID
		const user = await User.findOne({ where: { id } });

		if (!user) {
			throw CustomError.badRequest(`User with ID ${id} not found`);
		}

		// Actualizar los campos del usuario

		try {
			// Guardar los cambios en la base de datos
			return await user.save();
		} catch (error) {
			throw CustomError.unAuthorized('Error updating user');
		}
	}

	async disableUser(id: string) {
		try {
			// Buscar el usuario
			const user = await this.findOne(id);

			if (!id) {
				throw CustomError.badRequest(`User with ID ${id} not found`);
			}

			// Deshabilitar al usuario
			user.status = false;

			// Guardar cambios
			await user.save();

			return { message: `User with ID ${id} has been disabled` };
		} catch (error) {
			// Manejo del error
			throw CustomError.internalServer('Unknown error occurred');
		}
	}
}
