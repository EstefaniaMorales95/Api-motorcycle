import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';
import { CustomError } from '../../domain';

export class UsersController {
	constructor(private readonly userService: UsersService) {}

	private handleError = (error: unknown, res: Response) => {
		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({ message: error.message });
		}
		console.log(error);
		return res.status(500).json({ message: 'Something went very wrong!💣' });
	};

	findAllUsers = async (req: Request, res: Response) => {
		this.userService
			.findAllUsers()
			.then((data) => res.status(200).json(data))
			.catch((error: any) => this.handleError(error, res));
	};

	findOneUser = async (req: Request, res: Response) => {
		const { id } = req.params;

		this.userService
			.findOne(id)
			.then((data) => {
				res.status(200).json(data);
			})
			.catch((error: any) => this.handleError(error, res));
	};

	createUser = async (req: Request, res: Response) => {
		const [error, CreateUserDTO] = CreateUserDTO.create(req.body);

		if (error) return res.status(422).json({ message: error });
		this.userService
			.createUser(CreateUserDTO)
			.then((data: any) => {
				return res.status(201).json(data);
			})
			.catch((error: unknown) => this.handleError(error, res));
	};

	updateUser = async (req: Request, res: Response) => {
		const { id } = req.params;
		const { error, updateUserDto } = updateUserDto(req.body);

		if (error) return res.status(422).json({ message: error });

		this.userService
			.updateUser(id, name, lastname, req.body)
			.then((data) => {
				return res.status(200).json(data);
			})
			.catch((error: unknown) => this.handleError(error, res));
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
