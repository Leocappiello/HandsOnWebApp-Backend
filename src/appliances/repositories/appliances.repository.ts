import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateApplianceDto } from '../dto/create-appliance.dto';
import { Appliance } from '../entities/appliance.entity';

export class ApplianceRepository extends Repository<Appliance> {
  constructor(
    @InjectRepository(Appliance)
    private applianceRepository: Repository<Appliance>,
  ) {
    super(
      applianceRepository.target,
      applianceRepository.manager,
      applianceRepository.queryRunner,
    );
  }

  public async findAll(): Promise<Appliance[]> {
    return this.find();
  }

  public async findById(id: string): Promise<Appliance | null> {
    return this.findOneBy({ id });
  }

  public async store(appliance: CreateApplianceDto): Promise<Appliance> {
    const newAppliance = this.create(appliance);
    return this.save(newAppliance);
  }

  public async destroy(id: string): Promise<void> {
    await this.delete(id);
  }
}
