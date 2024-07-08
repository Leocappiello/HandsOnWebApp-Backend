import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { Job } from './entities/job.entity';
import { JobRepository } from './repositories/jobs.repository';

@Injectable()
export class JobsService {
  constructor(private readonly jobRepository: JobRepository) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    try {
      const existsJob = await this.jobRepository.findOneBy({
        companyName: createJobDto.companyName,
      });
      if (existsJob) {
        throw new BadRequestException('Already exists that company name');
      }
      const newJob = this.jobRepository.create(createJobDto);
      return await this.jobRepository.save(newJob);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error(`JobService:create: ${error.message}`);
      throw new InternalServerErrorException('Failed to create a new job');
    }
  }

  async findAll({ page, limit }: { page: number; limit: number }) {
    const [jobs, total] = await this.jobRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: jobs,
      count: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    return await this.jobRepository.findById(id);
  }

  async remove(id: number) {
    try {
      return await this.jobRepository.destroy(id);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error(`JobService:delete: ${error.message}`);
      throw new InternalServerErrorException('Failed to delete a new job');
    }
  }
}
