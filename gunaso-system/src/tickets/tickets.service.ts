import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTicketDto, UpdateTicketDto } from './dto/ticket.dto';
import { TicketStatus } from '@prisma/client';


@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  async create(createTicketDto: CreateTicketDto) {
    const categoryId = createTicketDto.categoryId ?? 1;

    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) throw new BadRequestException('Category not found');

    return this.prisma.ticket.create({
      data: {
        code: createTicketDto.code, 
        title: createTicketDto.title,
        description: createTicketDto.description,
        status: createTicketDto.status ?? TicketStatus.NEW,
        categoryId: category.id,
        wardId: createTicketDto.wardId,
        createdById: createTicketDto.createdById ?? null,
        assignedToId: createTicketDto.assignedToId!,
      },
    });
  }

  async findAll() {
    return this.prisma.ticket.findMany({
      include: {
        category: true,
        ward: true,
        createdBy: true,
        assignedTo: true,
        comments: true,
      },
    });
  }

  async findOne(id: string) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
      include: {
        category: true,
        ward: true,
        createdBy: true,
        assignedTo: true,
        comments: true,
      },
    });

    if (!ticket) throw new NotFoundException(`Ticket with ID ${id} not found`);
    return ticket;
  }

  async update(id: string, updateTicketDto: Partial <UpdateTicketDto>) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
    });
    if (!ticket) throw new NotFoundException(`Ticket with ID ${id} not found`);

    // if(requst.user.role === 'ADMIN') throw new ForbiddenException('You do not have permission to update this ticket');
    
    return this.prisma.ticket.update({
      where: { id },
      data: {
        code: updateTicketDto.code ?? ticket.code,
        title: updateTicketDto.title ?? ticket.title,
        description: updateTicketDto.description ?? ticket.description,
        status: updateTicketDto.status ?? ticket.status,
        categoryId: updateTicketDto.categoryId ?? ticket.categoryId,
        wardId: updateTicketDto.wardId ?? ticket.wardId,
        assignedToId: updateTicketDto.assignedToId ?? ticket.assignedToId,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.ticket.delete({
      where: { id },
    });
  }
}
