import { Controller, Get, Post, Put, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PrescriptionsService } from './prescriptions.service';

@ApiTags('Prescriptions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('prescriptions')
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @Post()
  create(@Body() data: any, @Request() req) {
    return this.prescriptionsService.create(data, req.user.userId);
  }

  @Get()
  findAll(@Query('patient_id') patientId: string, @Request() req) {
    return this.prescriptionsService.findAll(patientId, req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.prescriptionsService.findOne(id, req.user.userId);
  }

  @Put(':id/deactivate')
  deactivate(@Param('id') id: string, @Request() req) {
    return this.prescriptionsService.deactivate(id, req.user.userId);
  }
}
