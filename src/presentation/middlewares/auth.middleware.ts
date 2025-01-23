import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../config/jwt.adapter';
import { User, UserRole, UserStatus } from '../../data';

export class AuthMiddleware {
	static async protect(req: Request, res: Response, next: NextFunction) {
		const authorization = req.header('Authorization');

		if (!authorization) {
			return res
				.status(401)
				.json({ message: 'Provide a token, please login again' });
		}

		if (!authorization.startsWith('Bearer')) {
			return res
				.status(401)
				.json({ message: 'Invalid token, please login again' });
		}

		const token = authorization.split(' ')[1] || '';

		try {
			const payload = (await JwtAdapter.validateToken(token)) as { id: string };
			if (!payload)
				return res
					.status(401)
					.json({ message: 'Invalid token, please login again' });

			const user = await User.findOne({
				where: { id: payload.id, status: UserStatus.AVAILABLE },
			});

			if (!user) return res.status(401).json({ message: 'User not found' });

			req.body.sessionUser = user;

			next();
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: 'Internal server error' });
		}
	}

	static restricto = (...roles: UserRole[]) => {
		return (req: Request, res: Response, next: NextFunction) => {
			if (!roles.includes(req.body.sessionUser.role)) {
				return res.status(401).json({ message: 'You are nort authorized' });
			}

			next();
		};
	};
}