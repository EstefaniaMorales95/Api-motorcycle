import { Router } from 'express';
import { UsersRoutes } from './users/router';
import { RepairtRoutes } from './repairs/router';
import { UserRoutes } from './user/route';

export class AppRoutes {
	static get routes(): Router {
		const router = Router();

		router.use('/api/v1/users', UsersRoutes.routes);
		router.use('/api/v1/repairs', RepairtRoutes.routes);
		router.use('/api/v1/user', UserRoutes.routes);

		return router;
	}
}
