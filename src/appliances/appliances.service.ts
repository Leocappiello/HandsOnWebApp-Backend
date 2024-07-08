import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JobRepository } from 'src/jobs/repositories/jobs.repository';
import { MailService } from 'src/mail/mail.service';
import { CreateApplianceDto } from './dto/create-appliance.dto';
import { ApplianceRepository } from './repositories/appliances.repository';

@Injectable()
export class AppliancesService {
  constructor(
    private readonly applianceRepository: ApplianceRepository,
    private readonly jobRepository: JobRepository,
    private readonly mailService: MailService,
  ) {}

  async create(createApplianceDto: CreateApplianceDto) {
    try {
      const existsAppliance = await this.applianceRepository.findOneBy({
        email: createApplianceDto.email,
      });
      if (existsAppliance) {
        throw new BadRequestException(
          'Already exists an appliance for this job',
        );
      }
      const existsJob = await this.jobRepository.findOneBy({
        id: createApplianceDto.jobId,
      });
      if (!existsJob) {
        throw new BadRequestException('Inexistent job');
      }

      const appliance = this.applianceRepository.create({
        ...createApplianceDto,
        job: existsJob,
      });

      await this.mailService.sendEmail(
        createApplianceDto.email,
        existsJob.companyName,
      );
      return await this.applianceRepository.save(appliance);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error(`JobService:create: ${error.message}`);
      throw new InternalServerErrorException(
        'Failed to create a new appliance',
      );
    }
  }
}
