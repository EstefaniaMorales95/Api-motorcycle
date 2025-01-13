import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
	OneToMany,
	BaseEntity,
} from 'typeorm';
import { User } from './users.model'; // Asegúrate de tener este modelo
import { Repair } from './repairs.model';

@Entity()
export class motorcycle extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('timestamp', { nullable: false })
	date: Date;

	@Column({
		type: 'enum',
		enum: ['pending', 'completed', 'cancelled'],
		default: 'pending',
	})
	@Column({ default: true })
	status: boolean;

	@ManyToOne(() => User, (user) => user.motorcycles) // Asegúrate de tener esta relación
	@JoinColumn({ name: 'userId' })
	user: User;

	// Relación de uno a muchos entre Motorcycle y Repair
	@OneToMany(() => Repair, (repair) => repair.motorcycle)
	repairs: Repair[];
}
