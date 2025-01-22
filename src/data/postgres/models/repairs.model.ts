import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum RepairStatus {
	PENDING = 'PENDING',
	COMPLETED = 'COPLETED',
	CANCELLED = 'CANCELLED',
}
@Entity()
export class Repair extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('date', {
		nullable: false,
	})
	date: Date;
	@Column('varchar', {
		nullable: false,
	})
	motorsNumber: string;
	@Column('text', {
		nullable: false,
	})
	description: string;
	@Column('enum', {
		enum: RepairStatus,
		default: RepairStatus.PENDING,
	})
	status: RepairStatus;
	@Column('varchar', {
		nullable: false,
	})
	userId: string;
}
