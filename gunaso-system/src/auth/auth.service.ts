import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  //password hashing
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  // comapare hashed password
  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  // new user registration
  async register(data: { email: string; password: string; fullName: string }) {
    try {
      const hashedPassword = await this.hashPassword(data.password);
      const user = await this.prisma.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          fullName: data.fullName,
        },
      });
      return user;
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new HttpException(
          'Email already exists. Please use a different email.',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw error; // Rethrow other errors
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await this.comparePasswords(
      password,
      user.password,
    );
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  // JWT token
  async login(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
