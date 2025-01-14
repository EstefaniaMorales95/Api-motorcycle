import { Router } from 'express';

import { UsersService } from '../services/users.service';

export class UserRoutes {
	static get routes(): Router {
		const router = Router();
		const userService = new UsersService();
		//const UserController = new UsersController();

		//router.post('/login', UserController.login);

		return router;
	}
}
