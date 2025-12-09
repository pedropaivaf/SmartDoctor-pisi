import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Patient } from './patient.entity';
import { User } from './user.entity';
import { MedicalRecord } from './medical-record.entity';
import { PrescriptionItem } from './prescription-item.entity';

@Entity('prescriptions')
export class Prescription {
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

  @ManyToOne(() => MedicalRecord, { nullable: true })
  medical_record: MedicalRecord;

  @Column({ nullable: true })
  medical_record_id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  prescription_date: Date;

  @Column({ nullable: true })
  prescription_type: string;

  @Column({ type: 'date', nullable: true })
  valid_until: Date;

  @Column({ default: true })
  is_active: boolean;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @OneToMany(() => PrescriptionItem, item => item.prescription)
  items: PrescriptionItem[];

  @CreateDateColumn()
  created_at: Date;
}
