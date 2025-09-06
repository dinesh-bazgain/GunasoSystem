import { Body, Controller, Get, Param, Post, Patch, Delete } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto, UpdateTicketDto } from './dto/ticket.dto';


@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {}

  // Create Ticket
  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  // Get all Tickets
  @Get()
  findAll() {
    return this.ticketsService.findAll();
  }

  // Get one Ticket by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(id);
  }

  // Update Ticket
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(id, updateTicketDto);
  }

  // Delete Ticket
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(id);
  }
}
