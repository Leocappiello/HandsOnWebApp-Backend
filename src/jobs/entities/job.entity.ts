import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 35 })
  name: string;

  @Column('text')
  description: string;

  @Column({ length: 45, unique: true })
  companyName: string;
}
