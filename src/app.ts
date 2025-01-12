import 'reflect-metadata';
import { envs } from './config';
import { PostgresDatabase } from './data';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import 'dotenv/config';

async function main() {
	try {
		// Conectar a la base de datos
		const database = new PostgresDatabase({
			host: envs.DB_HOST,
			port: envs.DB_PORT,
			username: envs.DB_USERNAME,
			password: envs.DB_PASSWORD,
			database: envs.DB_DATABASE,
		});

		// Configurar y arrancar el servidor
		const server = new Server({
			port: envs.PORT,
			routes: AppRoutes.routes,
		});
		await server.start();
	} catch (error) {
		console.error('Application failed to start:', error);
		process.exit(1); // Finaliza el proceso en caso de error crítico
	}
}

main();

// postgresql://neondb_owner:3ZsAUkCih2Bj@ep-shrill-heart-a4sktfr0.us-east-1.aws.neon.tech/neondb?sslmode=require

//typedatabase://username:password@host/databasename
