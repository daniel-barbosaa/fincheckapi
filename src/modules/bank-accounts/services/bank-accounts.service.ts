import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
import { ValidateBankAccountOwnershipService } from './validate-bank-account.ownership.service';

@Injectable()
export class BankAccountsService {
    constructor(
        private readonly banckAccountsRepo: BankAccountsRepository,
        private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    ) {}
    create(userId: string, createBankAccountDto: CreateBankAccountDto) {
        const { name, initialBalance, color, type } = createBankAccountDto;
        return this.banckAccountsRepo.create({
            data: {
                userId,
                name,
                initialBalance,
                color,
                type,
            },
        });
    }

    findAllByUserId(userId: string) {
        return this.banckAccountsRepo.findMany({
            where: {
                userId,
            },
        });
    }

    async update(
        userId: string,
        bankAccountId: string,
        updateBankAccountDto: UpdateBankAccountDto,
    ) {
        await this.validateBankAccountOwnershipService.validate(
            userId,
            bankAccountId,
        );

        const { name, initialBalance, type, color } = updateBankAccountDto;

        return this.banckAccountsRepo.update({
            where: {
                id: bankAccountId,
            },
            data: {
                name,
                initialBalance,
                type,
                color,
            },
        });
    }

    async remove(userId: string, bankAccountId: string) {
        await this.validateBankAccountOwnershipService.validate(
            userId,
            bankAccountId,
        );
        await this.banckAccountsRepo.delete({
            where: {
                id: bankAccountId,
            },
        });

        return null;
    }
}
