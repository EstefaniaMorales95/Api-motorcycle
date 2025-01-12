import { PostgresDatabase, User, UserRole, UserStatus } from '../../data';
import bcrypt from 'bcrypt';

export class UsersService {
	constructor() {}

	async getAllUsers() {
		try {
			return await User.find();
		} catch (error) {
			throw new Error('Error finding a user by their id');
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
			throw new Error('User not found'); // Mejor que 'Post not found', ya que se refiere a un usuario
		}

		return user; // Devolver el usuario encontrado
	}

	async createUser(userData: any) {
		const user = new User();

		user.name = userData.name;
		user.email = userData.email;
		user.password = userData.password;
		user.role = userData.role;
		user.status = userData.status;
		try {
			return await user.save();
		} catch (error) {
			throw new Error('Error creating user');
		}
	}

	async updateUser(id: string, name: string, lastname: string, userData: any) {
		// Buscar el usuario existente por ID
		const user = await User.findOne({ where: { id } });

		if (!user) {
			throw new Error(`User with ID ${id} not found`);
		}

		// Actualizar los campos del usuario
		user.name = name || userData.name || user.name;
		user.lastname = lastname || userData.lastname || user.lastname;

		try {
			// Guardar los cambios en la base de datos
			return await user.save();
		} catch (error) {
			throw new Error('Error updating user');
		}
	}

	async disableUser(id: string) {
		try {
			// Buscar el usuario
			const user = await this.findOne(id);

			if (!id) {
				throw new Error(`User with ID ${id} not found`);
			}

			// Deshabilitar al usuario
			user.status = false;

			// Guardar cambios
			await user.save();

			return { message: `User with ID ${id} has been disabled` };
		} catch (error) {
			// Manejo del error
			throw new Error('Unknown error occurred');
		}
	}
}
