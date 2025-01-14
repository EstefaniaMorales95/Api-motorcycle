import { Request, Response } from 'express';
import { CustomError } from '../../domain';
import { UserService } from '../services/user.service';

export class UserController {
	constructor(private readonly userService: UserService) {}

	private handleError = (error: unknown, res: Response) => {
		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({ message: error.message });
		}
		console.log(error);
		return res.status(500).json({ message: 'Something went very wrong!💣' });
	};

	login = (req: Request, res: Response) => {
		this.userService
			.login(1)
			.then((data) => res.status(200).json(data))
			.catch((error) => this.handleError(error, res));
	};

	register = (req: Request, res: Response) => {
		this.userService
			.register(1)
			.then((data) => res.status(200).json(data))
			.catch((error) => this.handleError(error, res));
	};
}
