import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum RepairStatus {
	PENDING = 'PENDING',
	COMPLETED = 'COPLETED',
	CANCELLED = 'CANCELLED',
}
@Entity()
export class Repair {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('date', {
		nullable: false,
	})
	date: Date;
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
