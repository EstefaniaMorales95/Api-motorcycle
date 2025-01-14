import 'reflect-metadata';
import { envs } from './config';
import { PostgresDatabase } from './data';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import 'dotenv/config';

async function main() {
	const postgres = new PostgresDatabase({
		username: envs.DB_USERNAME,
		password: envs.DB_PASSWORD,
		host: envs.DB_HOST,
		database: envs.DB_DATABASE,
		port: envs.DB_PORT,
	});

	await postgres.connect();

	const server = new Server({
		port: envs.PORT,
		routes: AppRoutes.routes,
	});
	await server.start();
}

main();

// postgresql://neondb_owner:3ZsAUkCih2Bj@ep-shrill-heart-a4sktfr0.us-east-1.aws.neon.tech/neondb?sslmode=require

//typedatabase://username:password@host/databasename
