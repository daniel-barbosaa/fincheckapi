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
    Query,
    ParseIntPipe,
} from '@nestjs/common';
import { TransactionsService } from './services/transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ActiveUserId } from 'src/shared/decorators/activeUserId';
import { OptionalParseUUIDPipe } from 'src/shared/pipes/OptionalParseUUIDPipe';
import { TransactionType } from './entities/Transaction';
import { OptionalParseEnumPipe } from 'src/shared/pipes/OptionalParseEnumPipe';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Transações')
@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @ApiOperation({ summary: 'Cadastra nova transação' })
    @Post()
    create(
        @ActiveUserId() userId: string,
        @Body() createTransactionDto: CreateTransactionDto,
    ) {
        return this.transactionsService.create(userId, createTransactionDto);
    }

    @ApiOperation({ summary: 'Lista transações com filtros opcionais' })
    @Get()
    findAll(
        @ActiveUserId() userId: string,
        @Query('month', ParseIntPipe) month: number,
        @Query('year', ParseIntPipe) year: number,
        @Query('bankAccountId', OptionalParseUUIDPipe) bankAccountId: string,
        @Query('type', OptionalParseEnumPipe) type?: TransactionType,
    ) {
        return this.transactionsService.findAllByUserId(userId, {
            month,
            year,
            bankAccountId,
            type,
        });
    }
    @ApiOperation({ summary: 'Atualiza transação pelo ID' })
    @Put(':transactionId')
    update(
        @ActiveUserId() userId: string,
        @Param('transactionId', ParseUUIDPipe) transactionId: string,
        @Body() updateTransactionDto: UpdateTransactionDto,
    ) {
        return this.transactionsService.update(
            userId,
            transactionId,
            updateTransactionDto,
        );
    }
    @ApiOperation({ summary: 'Deleta transação pelo ID' })
    @Delete(':transactionId')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(
        @ActiveUserId() userId: string,
        @Param('transactionId', ParseUUIDPipe) transactionId: string,
    ) {
        return this.transactionsService.remove(userId, transactionId);
    }
}
