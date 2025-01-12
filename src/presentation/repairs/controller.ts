// motorcycles.controller.ts
import { Request, Response } from 'express';
import { MotorcyclesService } from '../services/repairs.service';

export class MotorcyclesController {
	private motorcyclesService: MotorcyclesService;

	constructor(motorcyclesService: MotorcyclesService) {
		this.motorcyclesService = motorcyclesService;
	}

	// Obtener la lista de motos pendientes
	getPendingRepairs = async (req: Request, res: Response) => {
		try {
			const motorcycles = await this.motorcyclesService.getPendingRepairs();
			return res.status(200).json(motorcycles);
		} catch (error) {
			return res.status(500).json({
				message: 'Error al obtener las reparaciones pendientes',
				error,
			});
		}
	};

	// Obtener una moto pendiente por su ID
	getPendingRepairById = async (req: Request, res: Response) => {
		const { id } = req.params;

		try {
			const motorcycle = await this.motorcyclesService.getPendingRepairById(id);
			if (!motorcycle) {
				return res
					.status(404)
					.json({ message: 'Moto no encontrada o no está pendiente' });
			}
			return res.status(200).json(motorcycle);
		} catch (error) {
			return res
				.status(500)
				.json({ message: 'Error al obtener la moto pendiente', error });
		}
	};

	// Crear una cita para la reparación
	createRepair = async (req: Request, res: Response) => {
		const { date, userId } = req.body;

		if (!date || !userId) {
			return res
				.status(400)
				.json({ message: 'Faltan campos requeridos: date, userId' });
		}

		try {
			const newRepair = await this.motorcyclesService.createRepair(
				date,
				userId,
			);
			return res.status(201).json(newRepair);
		} catch (error) {
			return res
				.status(500)
				.json({ message: 'Error al crear la reparación', error });
		}
	};

	// Actualizar el status de la reparación a completado
	completeRepair = async (req: Request, res: Response) => {
		const { id } = req.params;

		try {
			const completedRepair = await this.motorcyclesService.completeRepair(id);
			if (!completedRepair) {
				return res.status(404).json({
					message: 'Moto no encontrada o no está pendiente para completar',
				});
			}
			return res.status(200).json(completedRepair);
		} catch (error) {
			return res
				.status(500)
				.json({ message: 'Error al completar la reparación', error });
		}
	};

	// Cancelar la reparación de la moto
	cancelRepair = async (req: Request, res: Response) => {
		const { id } = req.params;
		try {
			const cancelledRepair = await this.motorcyclesService.cancelRepair(id);
			if (!cancelledRepair) {
				return res.status(404).json({
					message: 'Moto no encontrada o no está pendiente para cancelar',
				});
			}
			return res
				.status(200)
				.json({ message: 'Reparación cancelada exitosamente' });
		} catch (error) {
			return res
				.status(500)
				.json({ message: 'Error al cancelar la reparación', error });
		}
	};
}
