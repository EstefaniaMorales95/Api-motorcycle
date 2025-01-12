import { Router } from 'express';

import { UsersService } from '../services/users.service';
import { PostgresDatabase } from '../../data';
import { UsersController } from './controller';

export class UsersRoutes {
	static get routes(): Router {
		const router = Router();

		const usersService = new UsersService();
		const usersController = new UsersController(usersService);

		// Rutas
		router.get('/', usersController.getAllUsers);
		router.get('/:id', usersController.findOne); // Usamos ':id' para recibir un parámetro de ID
		router.post('/', usersController.createUser);
		router.patch('/:id', usersController.updateUser); // Usamos ':id' para el parámetro de ID
		router.delete('/:id', usersController.disableUser); // Usamos ':id' para el parámetro de ID

		return router;
	}
}
