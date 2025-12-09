import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prescription } from '../../entities/prescription.entity';
import { PrescriptionItem } from '../../entities/prescription-item.entity';
import { PatientsService } from '../patients/patients.service';

@Injectable()
export class PrescriptionsService {
  constructor(
    @InjectRepository(Prescription)
    private prescriptionsRepo: Repository<Prescription>,
    @InjectRepository(PrescriptionItem)
    private itemsRepo: Repository<PrescriptionItem>,
    private patientsService: PatientsService,
  ) {}

  async create(data: any, userId: string) {
    await this.patientsService.findOne(data.patient_id, userId);

    const prescription = this.prescriptionsRepo.create({
      patient_id: data.patient_id,
      doctor_id: userId,
      prescription_type: data.prescription_type,
      valid_until: data.valid_until,
      notes: data.notes,
      medical_record_id: data.medical_record_id,
    });

    const savedPrescription = await this.prescriptionsRepo.save(prescription);

    if (data.items && data.items.length > 0) {
      const items = data.items.map((item: any) =>
        this.itemsRepo.create({
          ...item,
          prescription_id: savedPrescription.id,
        }),
      );
      await this.itemsRepo.save(items);
    }

    return this.findOne(savedPrescription.id, userId);
  }

  async findAll(patientId: string, userId: string) {
    await this.patientsService.findOne(patientId, userId);

    return this.prescriptionsRepo.find({
      where: { patient_id: patientId },
      relations: ['items', 'items.medication'],
      order: { prescription_date: 'DESC' },
    });
  }

  async findOne(id: string, userId: string) {
    const prescription = await this.prescriptionsRepo.findOne({
      where: { id },
      relations: ['patient', 'doctor', 'items', 'items.medication'],
    });

    if (!prescription) {
      throw new NotFoundException('Prescrição não encontrada');
    }

    await this.patientsService.findOne(prescription.patient_id, userId);

    return prescription;
  }

  async deactivate(id: string, userId: string) {
    const prescription = await this.findOne(id, userId);
    prescription.is_active = false;
    return this.prescriptionsRepo.save(prescription);
  }
}
