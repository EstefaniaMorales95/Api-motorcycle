import z from 'zod';
import { regularExp } from '../../../config';

const createRepairSchema = z.object({
	date: z.string({ message: 'date is required' }).date(),
	motorsNumber: z.string().min(5, { message: 'MotorsNumber is required' }),
	description: z.string().min(10, { message: 'description is required' }),
	userId: z.string().uuid({ message: 'userId is required' }),
});

export class CreateRepairDTO {
	constructor(
		public date: Date,
		public userId: string,
		public motorsNumber: string,
		public description: string,
		public readonly user: { id: string; name: string; email: string },
	) {}

	static create(object: {
		[key: string]: any;
	}): [Record<string, string>?, CreateRepairDTO?] {
		const { date, userId, motorsNumber, description, user } = object;

		const result = createRepairSchema.safeParse(object);

		if (!result.success) {
			const errorMessages = result.error.errors.reduce((acc: any, err: any) => {
				const field = err.path.join('.');
				acc[field] = err.message;
				return acc;
			}, {} as Record<string, string>);
			return [errorMessages];
		}

		return [
			undefined,
			new CreateRepairDTO(date, userId, motorsNumber, description, {
				id: user.id,
				name: user.name,
				email: user.email,
			}),
		];
	}
}
