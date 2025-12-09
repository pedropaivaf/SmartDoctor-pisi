import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../../entities/patient.entity';
import { MedicalRecord } from '../../entities/medical-record.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepo: Repository<Patient>,
    @InjectRepository(MedicalRecord)
    private medicalRecordsRepo: Repository<MedicalRecord>,
  ) {}

  async create(data: any, userId: string, clinicId: string) {
    const patient = this.patientsRepo.create({
      ...data,
      responsible_doctor_id: userId,
      clinic_id: clinicId,
    });
    return this.patientsRepo.save(patient);
  }

  async findAll(userId: string, clinicId: string) {
    return this.patientsRepo.find({
      where: {
        clinic_id: clinicId,
        responsible_doctor_id: userId,
      },
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: string, userId: string) {
    const patient = await this.patientsRepo.findOne({
      where: { id },
      relations: ['responsible_doctor', 'clinic'],
    });

    if (!patient) {
      throw new NotFoundException('Paciente não encontrado');
    }

    if (patient.responsible_doctor_id !== userId) {
      throw new ForbiddenException('Acesso negado');
    }

    return patient;
  }

  async update(id: string, data: any, userId: string) {
    const patient = await this.findOne(id, userId);
    Object.assign(patient, data);
    return this.patientsRepo.save(patient);
  }

  async createMedicalRecord(patientId: string, data: any, userId: string) {
    await this.findOne(patientId, userId);

    const record = this.medicalRecordsRepo.create({
      ...data,
      patient_id: patientId,
      doctor_id: userId,
    });

    return this.medicalRecordsRepo.save(record);
  }

  async getMedicalRecords(patientId: string, userId: string) {
    await this.findOne(patientId, userId);

    return this.medicalRecordsRepo.find({
      where: { patient_id: patientId },
      order: { consultation_date: 'DESC' },
    });
  }

  async getMedicalRecord(patientId: string, recordId: string, userId: string) {
    await this.findOne(patientId, userId);

    const record = await this.medicalRecordsRepo.findOne({
      where: { id: recordId, patient_id: patientId },
    });

    if (!record) {
      throw new NotFoundException('Prontuário não encontrado');
    }

    return record;
  }

  async updateMedicalRecord(patientId: string, recordId: string, data: any, userId: string) {
    const record = await this.getMedicalRecord(patientId, recordId, userId);
    Object.assign(record, data);
    return this.medicalRecordsRepo.save(record);
  }
}
