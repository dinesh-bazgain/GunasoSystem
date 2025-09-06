import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';
import { WardsService } from './wards.service';
import { CreateWardDto, UpdateWardDto } from './dto/wards.dto';

@Controller('wards')
export class WardsController {
    constructor(private readonly WardsService: WardsService) {}

    // Create Ward
    @Post()
    create(@Body() createWardDto: CreateWardDto) {
        return this.WardsService.create(createWardDto);
    }

    // Get all Wards
    @Get()
    findAll() {
        return this.WardsService.findAll();
    }

    // Get one Ward by ID
    @Get(':id')
    findOne(@Param ('id') id: string) {
        return this.WardsService.findOne(id);
    }

    // Update Ward
    @Patch(':id')
    update(@Param("id") id:string, @Body() updateWardDto: UpdateWardDto){
        return this.WardsService.update(id, updateWardDto);
    }

    // Delete Ward
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.WardsService.remove(id);
    }
}