import { Repository } from 'typeorm';
import { PostgresDatabase } from '../../data'; // Asegúrate de usar tu clase de base de datos
import { motorcycle } from '../../data/postgres/models/modelo.moto'; // Asegúrate de que sea "Motorcycle"
import { Repair } from '../../data/postgres/models/repairs.model';

export class MotorcyclesService {
	private database: PostgresDatabase;
	private motorcycleRepository: Repository<motorcycle>; // Aquí lo anotamos explícitamente
	private repairRepository: Repository<Repair>;

	constructor(database: PostgresDatabase) {
		this.database = database;
		// Ahora inicializamos el repositorio con el tipo correcto
		this.motorcycleRepository =
			this.database.datasource.getRepository(motorcycle);
		this.repairRepository = this.database.datasource.getRepository(Repair);
	}

	// Obtener todas las motos pendientes de reparación
	async getPendingRepairs(): Promise<motorcycle[]> {
		return this.motorcycleRepository.find({ where: { status: 'pending' } });
	}

	// Obtener una moto pendiente por su ID
	async getPendingRepairById(id: string): Promise<motorcycle | null> {
		const motorcycle = await this.motorcycleRepository.findOne({
			where: { id, status: 'pending' },
		});
		return motorcycle || null; // Devuelve la moto o null si no se encuentra
	}

	// Crear una nueva cita de reparación
	async createRepair(date: string, userId: string): Promise<motorcycle> {
		const newRepair = this.motorcycleRepository.create({
			user: { id: userId }, // Asume que el campo 'user' es una relación con la tabla 'users'
			date,
			status: 'pending',
		});
		return this.motorcycleRepository.save(newRepair); // Guarda la nueva moto en la base de datos
	}

	// Actualizar el status de la reparación a completado
	async completeRepair(id: string): Promise<motorcycle | null> {
		const motorcycle = await this.motorcycleRepository.findOne({
			where: { id, status: 'pending' },
		});

		if (motorcycle) {
			motorcycle.status = 'completed';
			return this.motorcycleRepository.save(motorcycle); // Guarda la moto actualizada
		}
		return null; // Si no existe, devuelve null
	}

	// Cancelar la reparación de la moto
	async cancelRepair(id: string): Promise<motorcycle | null> {
		const motorcycle = await this.motorcycleRepository.findOne({
			where: { id, status: 'pending' },
		});

		if (motorcycle) {
			motorcycle.status = 'cancelled';
			return this.motorcycleRepository.save(motorcycle); // Guarda la moto actualizada
		}
		return null; // Si no existe, devuelve null
	}
}
