import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete, 
  Put, 
  UseGuards 
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto/employee.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { PERMISSIONS } from './constants/permission.constants';

@Controller('employees')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @Permissions(PERMISSIONS.EMPLOYEE_CREATE)
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  @Permissions(PERMISSIONS.EMPLOYEE_READ)
  findAll() {
    return this.employeeService.findAllEmployees();
  }

  @Get(':id')
  @Permissions(PERMISSIONS.EMPLOYEE_READ)
  findOne(@Param('id') id: string) {
    return this.employeeService.findOneEmployee(id);
  }

  @Put(':id')
  @Permissions(PERMISSIONS.EMPLOYEE_UPDATE)
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.updateEmployee(id, updateEmployeeDto);
  }

  @Delete(':id')
  @Permissions(PERMISSIONS.EMPLOYEE_DELETE)
  remove(@Param('id') id: string) {
    return this.employeeService.deleteEmployee(id);
  }
}
