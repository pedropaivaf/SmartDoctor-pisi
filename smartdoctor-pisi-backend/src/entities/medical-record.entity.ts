import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Patient } from './patient.entity';
import { User } from './user.entity';

@Entity('medical_records')
export class MedicalRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Patient)
  patient: Patient;

  @Column()
  patient_id: string;

  @ManyToOne(() => User)
  doctor: User;

  @Column()
  doctor_id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  consultation_date: Date;

  @Column({ type: 'text', nullable: true })
  chief_complaint: string;

  @Column({ type: 'text', nullable: true })
  history_present_illness: string;

  @Column({ type: 'text', nullable: true })
  past_psychiatric_history: string;

  @Column({ type: 'text', nullable: true })
  past_medical_history: string;

  @Column({ type: 'text', nullable: true })
  family_history: string;

  @Column({ type: 'text', nullable: true })
  social_history: string;

  @Column({ type: 'text', nullable: true })
  substance_use: string;

  @Column({ type: 'jsonb', nullable: true })
  mental_status_exam: any;

  @Column('text', { array: true, default: '{}' })
  icd10_codes: string[];

  @Column({ type: 'text', nullable: true })
  diagnostic_impression: string;

  @Column({ type: 'text', nullable: true })
  treatment_plan: string;

  @Column({ type: 'text', nullable: true })
  psychotherapy_plan: string;

  @Column({ type: 'text', nullable: true })
  follow_up_plan: string;

  @Column({ type: 'jsonb', nullable: true })
  scales_applied: any;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
