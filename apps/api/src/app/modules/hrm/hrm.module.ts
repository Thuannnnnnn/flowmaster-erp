import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Employee } from './entities/employee.entity';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Attendance } from './entities/attendance.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Department,
      Employee,
      User,
      Role,
      Attendance
    ])
  ],
  exports: [TypeOrmModule]
})
export class HrmModule {}
