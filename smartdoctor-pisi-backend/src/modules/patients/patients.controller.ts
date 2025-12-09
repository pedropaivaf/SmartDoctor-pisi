import { Controller, Get, Post, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PatientsService } from './patients.service';

@ApiTags('Patients')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  create(@Body() data: any, @Request() req) {
    return this.patientsService.create(data, req.user.userId, req.user.clinicId);
  }

  @Get()
  findAll(@Request() req) {
    return this.patientsService.findAll(req.user.userId, req.user.clinicId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.patientsService.findOne(id, req.user.userId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any, @Request() req) {
    return this.patientsService.update(id, data, req.user.userId);
  }

  @Post(':id/medical-records')
  createMedicalRecord(@Param('id') id: string, @Body() data: any, @Request() req) {
    return this.patientsService.createMedicalRecord(id, data, req.user.userId);
  }

  @Get(':id/medical-records')
  getMedicalRecords(@Param('id') id: string, @Request() req) {
    return this.patientsService.getMedicalRecords(id, req.user.userId);
  }

  @Get(':id/medical-records/:recordId')
  getMedicalRecord(
    @Param('id') id: string,
    @Param('recordId') recordId: string,
    @Request() req,
  ) {
    return this.patientsService.getMedicalRecord(id, recordId, req.user.userId);
  }

  @Put(':id/medical-records/:recordId')
  updateMedicalRecord(
    @Param('id') id: string,
    @Param('recordId') recordId: string,
    @Body() data: any,
    @Request() req,
  ) {
    return this.patientsService.updateMedicalRecord(id, recordId, data, req.user.userId);
  }
}
