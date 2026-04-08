import { IsNotEmpty, IsString, IsOptional, IsEnum, IsDateString, IsNumber, IsUUID, MinLength, IsInt, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Gender } from '../entities/employee.entity';

/**
 * DTO cho việc tạo mới nhân viên (CREATE)
 */
export class CreateEmployeeDto {
  @ApiProperty({ example: 'NV001', description: 'Mã nhân viên duy nhất' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ example: 'Nguyễn Văn A', description: 'Họ và tên' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @ApiPropertyOptional({ example: '1995-05-15' })
  @IsDateString()
  @IsOptional()
  dob?: Date;

  @ApiPropertyOptional({ enum: Gender, example: Gender.MALE })
  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @ApiPropertyOptional({ example: '123 Đường ABC, Quận 1, TP.HCM' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ example: '2024-01-01' })
  @IsDateString()
  @IsOptional()
  hire_date?: Date;

  @ApiPropertyOptional({ example: '0011000123456' })
  @IsString()
  @IsOptional()
  bank_account?: string;

  @ApiPropertyOptional({ example: 'Vietcombank' })
  @IsString()
  @IsOptional()
  bank_name?: string;

  @ApiProperty({ example: 15000000 })
  @IsNumber()
  @IsNotEmpty()
  base_salary: number;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  department_id?: number;

  @ApiPropertyOptional({ example: 'uuid-string-here' })
  @IsUUID()
  @IsOptional()
  user_id?: string;
}

/**
 * DTO cho việc cập nhật nhân viên (UPDATE)
 * Kế thừa từ CreateEmployeeDto và biến tất cả các trường thành tùy chọn
 */
export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}

/**
 * DTO cho việc truy vấn danh sách (READ/QUERY)
 */
export class QueryEmployeeDto {
  @ApiPropertyOptional({ description: 'Tìm kiếm theo tên hoặc mã' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Lọc theo ID phòng ban' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  department_id?: number;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}
