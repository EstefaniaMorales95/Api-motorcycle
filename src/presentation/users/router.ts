import { Router } from 'express';

import { UsersService } from '../services/users.service';

import { UsersController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class UsersRoutes {
	static get routes(): Router {
		const router = Router();

		const usersService = new UsersService();
		const usersController = new UsersController(usersService);

		router.use(AuthMiddleware.protect);
		router.get('/', usersController.findAllUsers);
		router.get('/:id', usersController.findOneUser); // Usamos ':id' para recibir un parámetro de ID
		router.post('/', usersController.createUser);
		router.patch('/:id', usersController.updateUser); // Usamos ':id' para el parámetro de ID
		router.delete('/:id', usersController.disableUser); // Usamos ':id' para el parámetro de ID

		return router;
	}
}
