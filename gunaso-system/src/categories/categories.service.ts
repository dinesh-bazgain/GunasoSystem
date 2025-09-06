import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/categories.dto';

@Injectable()
export class CategoriesService {
    constructor(private prisma: PrismaService) {}

    // Create a new category
    async create(createCategoryDto: CreateCategoryDto){
        return this.prisma.category.create({
            data: {
                code: createCategoryDto.code,
                name_en: createCategoryDto.name_en,
                name_np: createCategoryDto.name_np,
                is_active: createCategoryDto.isActive ?? true,
            },
        });
    }

    // Get all categories
    async findAll() {
        return this.prisma.category.findMany();
    }

    // Get one category by ID
    async findOne(id: string) {
        return this.prisma.category.findUnique({
            where: { id: Number(id) },
        });
    }

    // Update category
    async update(id: string, updateCategoryDto: Partial<CreateCategoryDto>) {
        return this.prisma.category.update({
            where: { id: Number(id) },
            data: {
                code: updateCategoryDto.code,
                name_en: updateCategoryDto.name_en,
                name_np: updateCategoryDto.name_np,
                is_active: updateCategoryDto.isActive,
            },
        });
    }

    // Delete category
    async remove(id: string) {
        return this.prisma.category.delete({
            where: { id: Number(id) },
        });
    }
}
