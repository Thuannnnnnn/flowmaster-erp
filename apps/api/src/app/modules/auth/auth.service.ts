import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../modules/hrm/entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}
  async login(loginDto: LoginDto) {
    const { code, password } = loginDto;

    const adminCode = process.env.ADMIN_CODE || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin';

    if (code === adminCode && password === adminPassword) {
      const tokens = await this.getTokens('admin-id', adminCode, 'admin');
      return {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        user: {
          id: 'admin-id',
          code: code,
          full_name: 'Administrator',
          role: { name: 'admin' },
          avatar_url: null,
          employee: null
        }
      };
    }

    const user = await this.userRepository.findOne({ 
      where: { code },
      relations: ['role', 'employee', 'employee.department'] 
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const tokens = await this.getTokens(user.id, user.code, user.role ? user.role.name : null);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    user.last_login_at = new Date();
    await this.userRepository.update(user.id, { last_login_at: new Date() });
    
    return {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      user: {
        id: user.id,
        code: user.code,
        full_name: user.full_name,
        role: user.role,
        avatar_url: user.avatar_url,
        employee: user.employee
      }
    };
  }

  async logout(userId: string) {
    await this.userRepository.update(userId, { refresh_token: null });
  }
  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['role'] });
    if (!user || !user.refresh_token) {
      throw new UnauthorizedException('Access Denied');
    }

    const refreshTokenMatches = await bcrypt.compare(refreshToken, user.refresh_token);
    if (!refreshTokenMatches) {
      throw new UnauthorizedException('Access Denied');
    }

    const tokens = await this.getTokens(user.id, user.code, user.role ? user.role.name : null);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    const hash = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.update(userId, { refresh_token: hash });
  }

  private async getTokens(userId: string, code: string, role: string) {
    const payload = { 
      sub: userId, 
      code: code, 
      role: role 
    };
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: '15m',
        secret: process.env.JWT_SECRET || 'secretKey',
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || 'secretKey',
      }),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
