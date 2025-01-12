import dotenv from 'dotenv';
dotenv.config();
import express, { Router } from 'express';
import { PostgresDatabase } from '../data';

interface Options {
	port: number;
	routes: Router;
}

export class Server {
	private app = express();
	private readonly port: number;
	private readonly routes: Router;

	constructor(options: Options) {
		this.port = options.port;
		this.routes = options.routes;
	}

	async start() {
		try {
			// Middleware de configuración
			this.app.use(express.json());
			this.app.use(express.urlencoded({ extended: true }));
			this.app.use(this.routes);

			// Arrancar el servidor
			this.app.listen(this.port, () => {
				console.log(`Server started on port ${this.port} 🚀`);
			});
		} catch (error) {
			console.error('Error starting the server:', error);
			throw error; // Lanza el error para manejarlo fuera de esta clase
		}
	}
}
