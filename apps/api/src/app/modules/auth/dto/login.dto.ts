import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'USER123', description: 'The code of the user' })
  @IsNotEmpty()
  code: string;

  @ApiProperty({ example: 'password123', description: 'The password of the user', minLength: 6 })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
