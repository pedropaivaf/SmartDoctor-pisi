import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Clinic } from './clinic.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password_hash: string;

  @Column()
  name: string;

  @Column()
  crm: string;

  @Column({ length: 2 })
  crm_state: string;

  @Column({ nullable: true })
  specialty: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ default: 'doctor' })
  role: string;

  @Column({ default: true })
  is_active: boolean;

  @ManyToOne(() => Clinic, { nullable: true })
  clinic: Clinic;

  @Column({ nullable: true })
  clinic_id: string;

  @CreateDateColumn()
  created_at: Date;
}
