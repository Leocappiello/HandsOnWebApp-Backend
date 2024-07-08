import { Injectable } from '@nestjs/common';
import { JobRepository } from 'src/jobs/repositories/jobs.repository';

@Injectable()
export class CompaniesService {
  constructor(private readonly jobRepository: JobRepository) {}

  async findAll() {
    return await this.jobRepository.findAllCompanies();
  }

  async findOne(id: string) {
    return await this.jobRepository.findById(id);
  }

  async remove(id: string) {
    return await this.jobRepository.deleteCompany(id);
  }
}
