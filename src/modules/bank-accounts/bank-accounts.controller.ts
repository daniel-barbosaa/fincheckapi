import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    ParseUUIDPipe,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { BankAccountsService } from './services/bank-accounts.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { ActiveUserId } from 'src/shared/decorators/activeUserId';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Contas bancárias')
@Controller('bank-accounts')
export class BankAccountsController {
    constructor(private readonly bankAccountsService: BankAccountsService) {}

    @ApiOperation({ summary: 'Cadastra nova conta bancária ' })
    @Post()
    create(
        @ActiveUserId() userId: string,
        @Body() createBankAccountDto: CreateBankAccountDto,
    ) {
        return this.bankAccountsService.create(userId, createBankAccountDto);
    }
    @ApiOperation({ summary: 'Lista todas as contas bancária ' })
    @Get()
    findAll(@ActiveUserId() userId: string) {
        return this.bankAccountsService.findAllByUserId(userId);
    }
    @ApiOperation({ summary: 'Atualiza conta bancária por ID' })
    @Put(':bankAccontId')
    update(
        @ActiveUserId() userId: string,
        @Param('bankAccontId', ParseUUIDPipe) bankAccontId: string,
        @Body() updateBankAccountDto: UpdateBankAccountDto,
    ) {
        return this.bankAccountsService.update(
            userId,
            bankAccontId,
            updateBankAccountDto,
        );
    }
    @ApiOperation({ summary: 'Deleta conta bancária por ID' })
    @Delete(':bankAccontId')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(
        @ActiveUserId() userId: string,
        @Param('bankAccontId', ParseUUIDPipe) bankAccontId: string,
    ) {
        return this.bankAccountsService.remove(userId, bankAccontId);
    }
}
