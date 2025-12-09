import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clinic } from '../../entities/clinic.entity';
import { ClinicsService } from './clinics.service';

@Module({
  imports: [TypeOrmModule.forFeature([Clinic])],
  providers: [ClinicsService],
  exports: [ClinicsService],
})
export class ClinicsModule {}
