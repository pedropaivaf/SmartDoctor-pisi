import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { MedicationsService } from './medications.service';

@ApiTags('Medications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('medications')
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @Get('search')
  search(
    @Query('q') query: string,
    @Query('class') therapeuticClass?: string,
    @Query('subclass') subclass?: string,
    @Query('indication') indication?: string,
  ) {
    return this.medicationsService.search({
      query,
      therapeuticClass,
      subclass,
      indication,
    });
  }

  @Get('classes')
  getClasses() {
    return this.medicationsService.getTherapeuticClasses();
  }

  @Get('interactions/check')
  checkInteractions(@Query('drugs') drugIds: string[]) {
    return this.medicationsService.checkInteractions(Array.isArray(drugIds) ? drugIds : [drugIds]);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicationsService.findOne(id);
  }
}
