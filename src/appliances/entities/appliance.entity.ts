import { IsEmail } from 'class-validator';
import { Job } from 'src/jobs/entities/job.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Appliance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Job, (job) => job.id, { cascade: true })
  @JoinColumn({ name: 'jobId' })
  job: Job;

  @Column({ length: 35 })
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column('text')
  applianceText: string;
}
