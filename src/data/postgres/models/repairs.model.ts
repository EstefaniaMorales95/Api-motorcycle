import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
	BaseEntity,
} from 'typeorm';
import { motorcycle } from './modelo.moto';

export enum RepairStatus {
	PENDING = 'pending',
	COMPLETED = 'completed',
	CANCELLED = 'cancelled',
}

@Entity()
export class Repair extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('timestamp', { nullable: false })
	date: Date;

	@Column({
		type: 'enum',
		enum: RepairStatus,
		default: RepairStatus.PENDING,
	})
	@Column('bool', {
		default: true,
	})
	status: boolean;

	@ManyToOne(() => motorcycle, (motorcycle) => motorcycle.repairs) //
	@JoinColumn({ name: 'motorcycleId' })
	motorcycle: motorcycle;
}
