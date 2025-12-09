import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('medications')
export class Medication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  generic_name: string;

  @Column('text', { array: true, default: '{}' })
  brand_names: string[];

  @Column()
  therapeutic_class: string;

  @Column({ nullable: true })
  subclass: string;

  @Column({ nullable: true })
  controlled_substance: string;

  @Column({ nullable: true })
  prescription_type: string;

  @Column('text', { array: true, default: '{}' })
  available_doses: string[];

  @Column({ nullable: true })
  usual_dose_range: string;

  @Column({ nullable: true })
  max_daily_dose: string;

  @Column('text', { array: true, default: '{}' })
  indications: string[];

  @Column('text', { array: true, default: '{}' })
  contraindications: string[];

  @Column('text', { array: true, default: '{}' })
  common_side_effects: string[];

  @Column('text', { array: true, default: '{}' })
  serious_side_effects: string[];

  @Column('jsonb', { nullable: true })
  major_interactions: any;

  @Column({ nullable: true })
  half_life: string;

  @Column({ nullable: true })
  pregnancy_category: string;

  @Column({ nullable: true, default: false })
  breastfeeding_safe: boolean;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  created_at: Date;
}
