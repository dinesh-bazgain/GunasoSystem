import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({
      data: {
        fullName: createUserDto.fullName,
        email: createUserDto.email,
        password: createUserDto.password,
        role: createUserDto.role,
      },
    });
  }

  async findAll() {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        wardId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateUserDto: Partial<CreateUserDto>) {
    return this.prismaService.user.update({
      where: { id },
      data: {
        fullName: updateUserDto.fullName,
        email: updateUserDto.email,
        password: updateUserDto.password,
        role: updateUserDto.role,
      },
    });
  }

  async remove(id: string) {
    return this.prismaService.user.delete({
      where: { id },
    });
  }
}
