import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from 'src/jobs/entities/job.entity';
import { JobRepository } from 'src/jobs/repositories/jobs.repository';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Job])],
  controllers: [CompaniesController],
  providers: [CompaniesService, JobRepository],
})
export class CompaniesModule {}
