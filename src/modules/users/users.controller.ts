import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ActiveUserId } from 'src/shared/decorators/activeUserId';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiBearerAuth()
@ApiTags('Usuário')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @ApiOperation({ summary: 'Informações de usuário ' })
    @Get('/me')
    me(@ActiveUserId() userId: string) {
        return this.usersService.getUserById(userId);
    }
}
