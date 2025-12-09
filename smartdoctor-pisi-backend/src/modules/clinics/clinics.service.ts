import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clinic } from '../../entities/clinic.entity';

@Injectable()
export class ClinicsService {
  constructor(
    @InjectRepository(Clinic)
    private clinicsRepo: Repository<Clinic>,
  ) {}

  async create(data: any) {
    const clinic = this.clinicsRepo.create(data);
    return this.clinicsRepo.save(clinic);
  }

  async findById(id: string) {
    return this.clinicsRepo.findOne({ where: { id } });
  }
}
