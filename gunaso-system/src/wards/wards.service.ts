import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWardDto } from './dto/wards.dto';

@Injectable()
export class WardsService {
  constructor(private prisma: PrismaService) {}

  async create(createWardDto: CreateWardDto) {
    return this.prisma.ward.create({
      data: {
        id: createWardDto.id,
        code: createWardDto.code,
        name_en: createWardDto.name_en,
        name_np: createWardDto.name_np,
      },
    });
  }

  async findAll() {
    return this.prisma.ward.findMany({
      include: {
        tickets: true,
        users: true,
      },
    });
  }

  async findOne(id: string) {
    const ward = await this.prisma.ward.findUnique({
      where: { id: Number(id) },
      include: {
        tickets: true,
        users: true,
      },
    });
    if (!ward) throw new NotFoundException('Ward not found');
    return ward;
  }

  async update(id: string, updateWardDto: Partial<CreateWardDto>) {
    const existingWard = await this.prisma.ward.findUnique({
      where: { id: Number(id) },
    });
    if (!existingWard) throw new NotFoundException('Ward not found');

    return this.prisma.ward.update({
      where: { id: Number(id) },
      data: {
        code: updateWardDto.code ?? existingWard.code,
        name_en: updateWardDto.name_en ?? existingWard.name_en,
        name_np: updateWardDto.name_np ?? existingWard.name_np,
      },
    });
  }

  async remove(id: string) {
    const existingWard = await this.prisma.ward.findUnique({
      where: { id: Number(id) },
    });
    if (!existingWard) throw new NotFoundException('Ward not found');
  }
}
