import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Employee } from './entities/employee.entity';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Attendance } from './entities/attendance.entity';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Department,
      Employee,
      User,
      Role,
      Attendance
    ]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [TypeOrmModule]
})
export class HrmModule {}
