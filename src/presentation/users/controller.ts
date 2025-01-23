import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';
import { CreateUserDTO, CustomError, LoginUserDTO } from '../../domain';
import { UpdateUserDTO } from '../../domain/dtos/users/update-user.dto';

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
			.findAll()
			.then((data) => res.status(200).json(data))
			.catch((error: any) => this.handleError(error, res));
	};

	findOneUser = async (req: Request, res: Response) => {
		const { id } = req.params;

		this.userService
			.findOne(id)
			.then((data) => res.status(200).json(data))
			.catch((error: any) => this.handleError(error, res));
	};

	createUser = async (req: Request, res: Response) => {
		const [error, createUserDTO] = CreateUserDTO.create(req.body);

		if (error) return res.status(422).json({ message: error });
		this.userService
			.create(createUserDTO!)
			.then((data: any) => res.status(200).json(data))
			.catch((error: unknown) => this.handleError(error, res));
	};

	updateUser = async (req: Request, res: Response) => {
		const { id } = req.params;
		const [error, updateUserDto] = UpdateUserDTO.create(req.body);

		if (error) return res.status(422).json({ message: error });

		this.userService
			.update(id, updateUserDto!)
			.then((data) => res.status(200).json(data))
			.catch((error: any) => this.handleError(error, res));
	};

	disableUser = async (req: Request, res: Response) => {
		const { id } = req.params;

		this.userService
			.disable(id)
			.then((data) => res.status(204).json(data))
			.catch((error: any) => this.handleError(error, res));
	};
	loginUser = async (req: Request, res: Response) => {
		try {
			const result = LoginUserDTO.login(req.body);

			// Manejar errores
			if (result.error) {
				return res.status(400).json({ message: result.error });
			}

			// Llamar al servicio si todo está correcto
			const data = await this.userService.login(
				result.data!.email,
				result.data!.password,
			);
			return res.status(200).json(data);
		} catch (error) {
			this.handleError(error, res);
		}
	};
}
