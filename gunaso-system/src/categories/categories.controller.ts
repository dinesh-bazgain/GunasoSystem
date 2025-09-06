import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // Create Category
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  // Get all Categories
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  // get one Category by ID
  @Get(':id')
  findOne(@Body('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  // Update Category
  @Patch(':id')
  update(
    @Body('id') id: string,
    @Body() updateCategoryDto: Partial<CreateCategoryDto>,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  // Delete Category
  @Delete(':id')
  remove(@Body('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
