import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { ActiveUserId } from 'src/shared/decorators/activeUserId';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Categorias')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}
    @ApiOperation({ summary: 'Lista todas as categorias' })
    @Get()
    findAll(@ActiveUserId() userId: string) {
        return this.categoriesService.findAllByUserId(userId);
    }
}
