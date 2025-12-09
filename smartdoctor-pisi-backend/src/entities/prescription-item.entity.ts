import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Prescription } from './prescription.entity';
import { Medication } from './medication.entity';

@Entity('prescription_items')
export class PrescriptionItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Prescription, prescription => prescription.items)
  prescription: Prescription;

  @Column()
  prescription_id: string;

  @ManyToOne(() => Medication, { nullable: true })
  medication: Medication;

  @Column({ nullable: true })
  medication_id: string;

  @Column()
  medication_name: string;

  @Column()
  dosage: string;

  @Column()
  frequency: string;

  @Column({ nullable: true })
  duration: string;

  @Column({ nullable: true })
  quantity: string;

  @Column({ type: 'text', nullable: true })
  instructions: string;

  @CreateDateColumn()
  created_at: Date;
}
