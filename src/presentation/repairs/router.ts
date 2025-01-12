// motorcycles.routes.ts
import { Router } from 'express';

import { PostgresDatabase } from '../../data';
import { MotorcyclesController } from './controller';
import { MotorcyclesService } from '../services/repairs.service';

const router = Router();

const postgresDatabase = new PostgresDatabase({
	host: 'localhost',
	port: 5432,
	username: 'user',
	password: 'password',
	database: 'neondb',
});
export class RepairtRoutes {
	static get routes(): Router {
		const motorcyclesService = new MotorcyclesService(postgresDatabase);

		const motorcyclesController = new MotorcyclesController(motorcyclesService);

		router.get('/', motorcyclesController.getPendingRepairs);
		router.get('/:id', motorcyclesController.getPendingRepairById);
		router.post('/', motorcyclesController.createRepair);
		router.patch('/:id', motorcyclesController.completeRepair);
		router.delete('/:id', motorcyclesController.cancelRepair);

		return router;
	}
}
