import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { JobRepository } from './repositories/jobs.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Job])],
  providers: [JobRepository, JobsService],
  controllers: [JobsController],
})
export class JobsModule {}
