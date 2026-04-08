/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeeDto } from './dto/employee.dto';
@Injectable()
export class EmployeeService {

  constructor(@InjectRepository(Employee)
  private employeeRepository: Repository<Employee>
) {}
  create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = this.employeeRepository.create(createEmployeeDto);
    return this.employeeRepository.save(employee);
  }
  findAllEmployees(): Promise<Employee[]> {
    return this.employeeRepository.find({ relations: ['department', 'user'] });
  }
  findOneEmployee(id: string): Promise<Employee> {
  return this.employeeRepository.findOne({
    where: { id: id },
    relations: ['department', 'user']
  });
}
}
