export class CreateUserDTO {
	constructor(public readonly id: string, public readonly name: string) {}

	static create(object: { [key: string]: any }): [string?, CreateUserDTO?] {
		const { id, name } = object;

		if (!id) return ['Missing id'];
		if (!name) return ['Missing name'];

		return [undefined, new CreateUserDTO(id, name)];
	}
}
