import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medication } from '../../entities/medication.entity';

@Injectable()
export class MedicationsService {
  constructor(
    @InjectRepository(Medication)
    private medicationsRepo: Repository<Medication>,
  ) {}

  async search(filters: any) {
    const query = this.medicationsRepo.createQueryBuilder('m');

    if (filters.query) {
      query.where(
        '(m.generic_name ILIKE :search OR :search = ANY(m.brand_names))',
        { search: `%${filters.query}%` },
      );
    }

    if (filters.therapeuticClass) {
      query.andWhere('m.therapeutic_class = :class', { class: filters.therapeuticClass });
    }

    if (filters.subclass) {
      query.andWhere('m.subclass = :subclass', { subclass: filters.subclass });
    }

    if (filters.indication) {
      query.andWhere(':indication = ANY(m.indications)', { indication: filters.indication });
    }

    return query.take(50).getMany();
  }

  async findOne(id: string) {
    return this.medicationsRepo.findOne({ where: { id } });
  }

  async getTherapeuticClasses() {
    const result = await this.medicationsRepo
      .createQueryBuilder('m')
      .select('DISTINCT m.therapeutic_class', 'class')
      .addSelect('m.subclass', 'subclass')
      .getRawMany();

    const grouped = result.reduce((acc, item) => {
      if (!acc[item.class]) acc[item.class] = [];
      if (item.subclass && !acc[item.class].includes(item.subclass)) {
        acc[item.class].push(item.subclass);
      }
      return acc;
    }, {});

    return grouped;
  }

  async checkInteractions(drugIds: string[]) {
    const drugs = await this.medicationsRepo.findByIds(drugIds);
    const interactions = [];

    for (let i = 0; i < drugs.length; i++) {
      for (let j = i + 1; j < drugs.length; j++) {
        const drug1 = drugs[i];
        const drug2 = drugs[j];
        
        if (drug1.major_interactions) {
          const interaction = drug1.major_interactions.find(
            (int: any) => int.drug === drug2.generic_name,
          );
          if (interaction) {
            interactions.push({
              drug1: drug1.generic_name,
              drug2: drug2.generic_name,
              effect: interaction.effect,
              severity: 'major',
            });
          }
        }
      }
    }

    return interactions;
  }
}
