import { Router } from 'express';
import { RepairController } from './controller';
import { RepairService } from '../services/repairs.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { UserRole } from '../../data';

export class RepairtRoutes {
	static get routes(): Router {
		const router = Router();

		const repairService = new RepairService();
		const repairController = new RepairController(repairService);

		router.use(AuthMiddleware.protect);
		router.post('/', repairController.createRepairs);
		router.use(AuthMiddleware.restricto(UserRole.EMPLOYEE));
		router.get('/', repairController.findAllRepairs);
		router.get('/:id', repairController.findOneRepairs);
		router.patch('/:id', repairController.updateRepairs);
		router.delete('/:id', repairController.disableRepairs);

		return router;
	}
}
