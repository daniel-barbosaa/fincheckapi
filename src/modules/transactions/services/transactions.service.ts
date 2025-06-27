import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
import { ValidateBankAccountOwnershipService } from '../../bank-accounts/services/validate-bank-account.ownership.service';
import { ValidateCategoryOwnershipService } from '../../categories/services/validate.category.ownership.service';
import { ValidateTransactionOwnershipService } from './validate.category.ownership.service';

@Injectable()
export class TransactionsService {
    constructor(
        private readonly transactionsRepo: TransactionsRepository,
        private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
        private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
        private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService,
    ) {}
    async create(userId: string, createTransactionDto: CreateTransactionDto) {
        const { name, type, date, value, bankAccountId, categoryId } =
            createTransactionDto;

        await this.validateEntitiesOwnership({
            userId,
            bankAccountId,
            categoryId,
        });

        return this.transactionsRepo.create({
            data: {
                userId,
                name,
                type,
                date,
                value,
                backAccountId: bankAccountId,
                categoryId,
            },
        });
    }

    findAllByUserId(userId: string) {
        return this.transactionsRepo.findMany({
            where: {
                userId,
            },
        });
    }

    async update(
        userId: string,
        transactionId: string,
        updateTransactionDto: UpdateTransactionDto,
    ) {
        const { name, type, date, value, bankAccountId, categoryId } =
            updateTransactionDto;
        await this.validateEntitiesOwnership({
            userId,
            bankAccountId,
            categoryId,
            transactionId,
        });

        return this.transactionsRepo.update({
            where: {
                id: transactionId,
            },
            data: {
                name,
                type,
                date,
                value,
                backAccountId: bankAccountId,
                categoryId,
            },
        });
    }

    async remove(userId: string, transactionId: string) {
        await this.validateEntitiesOwnership({ userId, transactionId });

        await this.transactionsRepo.delete({
            where: {
                id: transactionId,
            },
        });

        return null;
    }

    private async validateEntitiesOwnership({
        userId,
        bankAccountId,
        categoryId,
        transactionId,
    }: {
        userId: string;
        bankAccountId?: string;
        categoryId?: string;
        transactionId?: string;
    }) {
        await Promise.all([
            transactionId &&
                this.validateTransactionOwnershipService.validate(
                    userId,
                    transactionId,
                ),
            bankAccountId &&
                this.validateBankAccountOwnershipService.validate(
                    userId,
                    bankAccountId,
                ),
            categoryId &&
                this.validateCategoryOwnershipService.validate(
                    userId,
                    categoryId,
                ),
        ]);
    }
}
