// import { v4 } from 'uuid';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from './User';

/**
 * Types of relations:
 * One to one;
 * One to many;
 * Many to many
 */

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // not needed anymore since typeorm is doing it
  // constructor({ provider, date }: Omit<Appointment, 'id'>) {
  //   this.id = v4();
  //   this.provider = provider;
  //   this.date = date;
  // }
}

export default Appointment;
