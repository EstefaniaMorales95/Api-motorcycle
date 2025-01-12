import { DataSource } from 'typeorm';
import { User } from './models/users.model';
import { Repair } from './models/repairs.model';
import { motorcycle } from './models/modelo.moto';

interface Options {
	host: string;
	port: number;
	username: string;
	password: string;
	database: string;
}

export class PostgresDatabase {
	public datasource: DataSource;

	constructor(option: Options) {
		this.datasource = new DataSource({
			type: 'postgres',
			host: option.host,
			port: option.port,
			username: option.username,
			password: option.password,
			database: option.database,
			entities: [User, Repair, motorcycle],
			synchronize: true,
			ssl: {
				rejectUnauthorized: false,
			},
		});
	}
	async connect() {
		try {
			await this.datasource.initialize();
			console.log('Database connected🔌');
		} catch (error) {
			console.error('Error connecting to the database:', error);
		}
	}
}
