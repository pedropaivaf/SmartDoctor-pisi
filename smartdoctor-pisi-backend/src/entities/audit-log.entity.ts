import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Patient } from './patient.entity';

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { nullable: true })
  user: User;

  @Column({ nullable: true })
  user_id: string;

  @Column()
  action: string;

  @Column()
  table_name: string;

  @Column({ nullable: true })
  record_id: string;

  @ManyToOne(() => Patient, { nullable: true })
  patient: Patient;

  @Column({ nullable: true })
  patient_id: string;

  @Column({ nullable: true })
  ip_address: string;

  @Column({ type: 'text', nullable: true })
  user_agent: string;

  @Column({ type: 'jsonb', nullable: true })
  changes: any;

  @CreateDateColumn()
  created_at: Date;
}
