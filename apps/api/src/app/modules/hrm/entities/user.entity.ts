import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Role } from './role.entity';
import { Employee } from './employee.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, unique: true })
  code: string;


  @Column({ length: 255 })
  password_hash: string;

  @Column({ length: 100 })
  full_name: string;

  @Column({ length: 255, nullable: true })
  avatar_url: string;

  @Column({ type: 'timestamp', nullable: true })
  last_login_at: Date;

  @Column({ length: 500, nullable: true })
  refresh_token: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' }) // Assuming single role for now for simplicity unless specified
  role: Role;

  @OneToOne(() => Employee, (employee) => employee.user)
  employee: Employee;
}
