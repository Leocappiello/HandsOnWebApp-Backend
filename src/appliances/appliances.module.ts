import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from 'src/jobs/entities/job.entity';
import { JobRepository } from 'src/jobs/repositories/jobs.repository';
import { MailService } from 'src/mail/mail.service';
import { AppliancesController } from './appliances.controller';
import { AppliancesService } from './appliances.service';
import { Appliance } from './entities/appliance.entity';
import { ApplianceRepository } from './repositories/appliances.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Appliance, Job])],
  controllers: [AppliancesController],
  providers: [
    ApplianceRepository,
    AppliancesService,
    JobRepository,
    MailService,
  ],
})
export class AppliancesModule {}
