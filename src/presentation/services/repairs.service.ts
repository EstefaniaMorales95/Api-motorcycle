import { Repository } from 'typeorm';
import { PostgresDatabase } from '../../data'; 
import { motorcycle } from '../../data/postgres/models/modelo.moto'; 
import { Repair } from '../../data/postgres/models/repairs.model';

export class MotorcyclesService {
	private database: PostgresDatabase;
	private motorcycleRepository: Repository<motorcycle>; 
	private repairRepository: Repository<Repair>;

	constructor(database: PostgresDatabase) {
		this.database = database;
		
		this.motorcycleRepository =
			this.database.datasource.getRepository(motorcycle);
		this.repairRepository = this.database.datasource.getRepository(Repair);
	}


	async getPendingRepairs(): Promise<motorcycle[]> {
		return this.motorcycleRepository.find({ where: { status: 'pending' } });
	}

	
	async getPendingRepairById(id: string): Promise<motorcycle | null> {
		const motorcycle = await this.motorcycleRepository.findOne({
			where: { id, status: 'pending' },
		});
		return motorcycle || null; 
	}

	
	async createRepair(date: string, userId: string): Promise<motorcycle> {
		const newRepair = this.motorcycleRepository.create({
			user: { id: userId }, 
			date,
			status: 'pending',
		});
		return this.motorcycleRepository.save(newRepair); 
	}

	
	async completeRepair(id: string): Promise<motorcycle | null> {
		const motorcycle = await this.motorcycleRepository.findOne({
			where: { id, status: 'pending' },
		});

		if (motorcycle) {
			motorcycle.status = 'completed';
			return this.motorcycleRepository.save(motorcycle); 
		}
		return null;
	}

	
	async cancelRepair(id: string): Promise<motorcycle | null> {
		const motorcycle = await this.motorcycleRepository.findOne({
			where: { id, status: 'pending' },
		});

		if (motorcycle) {
			motorcycle.status = 'cancelled';
			return this.motorcycleRepository.save(motorcycle); 
		return null; 
	}
}
