import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserRole {
	CLIENT = 'client',
	EMPLOYEE = 'employee',
}

export enum UserStatus {
	AVAILABLE = 'available',
	DISABLED = 'disabled',
}

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', {
		length: 80,
		nullable: false,
	})
	name: string;

	@Column('varchar', {
		length: 80,
		unique: true,
		nullable: false,
	})
	email: string;

	@Column('varchar', {
		nullable: false,
	})
	password: string;

	@Column({
		type: 'enum',
		enum: UserRole,
		default: UserRole.CLIENT,
	})
	role: UserRole;

	@Column({
		type: 'enum',
		enum: UserStatus,
		default: UserStatus.AVAILABLE,
	})
	@Column()
	status: boolean;

	disable() {
		this.status = false;
	}
}
