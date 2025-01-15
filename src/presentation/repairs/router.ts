import { Router } from 'express';
import { RepairController } from './controller';
import { RepairService } from '../services/repairs.service';

export class RepairtRoutes {
	static get routes(): Router {
		const router = Router();

		const repairService = new RepairService();
		const repairController = new RepairController(repairService);

		router.get('/', repairController.findAllRepairs);
		router.get('/:id', repairController.findOneRepairs);
		router.get('/', repairController.findAllRepairs);
		router.get('/', repairController.findAllRepairs);
		router.get('/', repairController.findAllRepairs);

		return router;
	}
}
