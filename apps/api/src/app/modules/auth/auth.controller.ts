import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 409, description: 'Email already exists.' })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Return access token and user info.' })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ status: 200, description: 'Return new tokens.' })
  @ApiResponse({ status: 401, description: 'Invalid refresh token.' })
  @ApiBearerAuth()
  refresh(@Req() req) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, description: 'User logged out.' })
  @ApiBearerAuth()
  async logout(@Req() req) {
    const userId = req.user['userId'] || req.user['sub'];
    return this.authService.logout(userId);
  }
}
