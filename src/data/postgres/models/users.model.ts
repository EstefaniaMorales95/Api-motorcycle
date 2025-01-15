import {
	BaseEntity,
	Column,
	Entity,
	FindOperator,
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

	@Column('enum', {
		enum: UserRole,
		default: UserRole.CLIENT,
	})
	role: UserRole;

	@Column('enum', {
		enum: UserStatus,
		default: UserStatus.AVAILABLE,
	})
	status: UserStatus;

	disable() {
		this.status = UserStatus.DISABLED;
	}
}
