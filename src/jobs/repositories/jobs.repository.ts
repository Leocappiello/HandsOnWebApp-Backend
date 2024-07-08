import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateJobDto } from '../dto/create-job.dto';
import { Job } from '../entities/job.entity';

export class JobRepository extends Repository<Job> {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {
    super(
      jobRepository.target,
      jobRepository.manager,
      jobRepository.queryRunner,
    );
  }

  public async findAll(): Promise<Job[]> {
    return this.find();
  }

  public async findById(id: string): Promise<Job | null> {
    return this.findOneBy({ id });
  }

  public async store(job: CreateJobDto): Promise<Job> {
    const newJob = this.create(job);
    return this.save(newJob);
  }

  public async destroy(id: number): Promise<void> {
    await this.delete(id);
  }

  public async findAllCompanies(): Promise<string[]> {
    return this.createQueryBuilder('job')
      .select(['job.id', 'job.companyName'])
      .distinct(true)
      .getRawMany();
  }

  public async deleteCompany(id: string) {
    return this.jobRepository.delete(id);
  }
}
