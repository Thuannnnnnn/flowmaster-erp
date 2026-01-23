import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, unique: true })
  email: string;

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

  // Relation defined in image: User has Roles (or Role). Image shows "has" -> Roles. 
  // Probably ManyToOne if User has 1 role, or ManyToMany if multiple. 
  // Image diagram typically shows simpler relations. Let's assume ManyToOne for simplicity based on typical ERP User-Role, or join table if ManyToMany.
  // The line "has" connects Users and Roles. 
  // But wait, the Users table doesn't explicitly show `role_id`. 
  // However, normally users have roles. I'll add ManyToMany or ManyToOne. 
  // Let's assume ManyToMany for flexibility or keep it simple with ManyToOne if usage suggests single role. 
  // Given "Roles" table usually implies reference. Let's assume ManyToMany and a join table, OR `role_id` column.
  // I will add a relation without a column property if it's implicit, or just ManyToOne.
  // I'll stick to ManyToMany usually, but let's check `Employees`. 
  // Ah, the image doesn't show a foreign key column in `Users` for `role_id`.
  // Wait, let me re-read the image. 
  // `Users` table: email, password_hash, ...
  // `Roles` table: id, name, ...
  // Connection line "has".
  // `Employees` has `user_id`.
  // I will use ManyToMany.
  
  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' }) // Assuming single role for now for simplicity unless specified
  role: Role;
}
