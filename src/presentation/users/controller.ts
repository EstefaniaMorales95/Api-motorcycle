import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';
import { CreateUserDTO } from '../../domain';

export class UsersController {
	constructor(private readonly userService: UsersService) {}

	getAllUsers = async (req: Request, res: Response) => {};

	findOne = async (req: Request, res: Response) => {
		const { id } = req.params;

		this.userService
			.findOne(id)
			.then((data) => {
				res.status(200).json(data);
			})
			.catch((error: any) => {
				res.status(500).json({
					message: 'Internal Server Error',
				});
			});
	};

	createUser = async (req: Request, res: Response) => {
		const [error] = CreateUserDTO.create(req.body);

		if (error) return res.status(422).json({ message: error });
		this.userService
			.createUser(req.body)
			.then((data: any) => {
				return res.status(201).json(data);
			})
			.catch((error: any) => {
				return res.status(500).json({
					message: 'Internal Server Error',
					error,
				});
			});
	};

	updateUser = async (req: Request, res: Response) => {
		const { id } = req.params;
		const { name, lastname } = req.body;

		this.userService
			.updateUser(id, name, lastname, req.body)
			.then((data) => {
				return res.status(200).json(data);
			})
			.catch((error: any) => {
				return res.status(500).json({
					message: 'Internal Server Error',
					error,
				});
			});
	};

	disableUser = async (req: Request, res: Response) => {
		const { id } = req.params;

		try {
			await this.userService.disableUser(id); // Llamada correcta al servicio
			return res.status(204).json(null); // Respuesta exitosa sin contenido
		} catch (error: any) {
			return res.status(500).json({
				message: 'Internal Server Error',
				error,
			});
		}
	};
}
