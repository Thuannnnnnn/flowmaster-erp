/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto/employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = this.employeeRepository.create(createEmployeeDto);
    return this.employeeRepository.save(employee);
  }

  findAllEmployees(): Promise<Employee[]> {
    return this.employeeRepository.find({ relations: ['department', 'user'] });
  }

  async findOneEmployee(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: { id: id },
      relations: ['department', 'user'],
    });
    if (!employee) {
      throw new NotFoundException(`Employee with ID '${id}' not found`);
    }
    return employee;
  }

  async updateEmployee(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    await this.employeeRepository.update(id, updateEmployeeDto);
    const updatedEmployee = await this.findOneEmployee(id);
    if (!updatedEmployee) {
      throw new NotFoundException(`Employee with ID '${id}' not found`);
    }
    return updatedEmployee;
  }

  async deleteEmployee(id: string): Promise<void> {
    const result = await this.employeeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee with ID '${id}' not found`);
    }
  }
}
