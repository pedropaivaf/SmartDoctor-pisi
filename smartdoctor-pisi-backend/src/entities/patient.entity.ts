import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Clinic } from './clinic.entity';
import { User } from './user.entity';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  full_name: string;

  @Column({ unique: true, nullable: true })
  cpf: string;

  @Column({ type: 'date' })
  birth_date: Date;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ nullable: true })
  emergency_contact: string;

  @Column({ nullable: true })
  emergency_phone: string;

  @Column({ nullable: true })
  insurance_provider: string;

  @Column({ nullable: true })
  insurance_number: string;

  @ManyToOne(() => Clinic)
  clinic: Clinic;

  @Column()
  clinic_id: string;

  @ManyToOne(() => User)
  responsible_doctor: User;

  @Column()
  responsible_doctor_id: string;

  @CreateDateColumn()
  created_at: Date;
}
