import { PrismaClient, TransactionType } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function seed() {
    const password = await hash('12345678', 10);

    if (process.env.NODE_ENV === 'production') {
        throw new Error('Seed cannot be rotated in production. ❌');
    }

    console.log('👤 Creating user...');
    const user = await prisma.user.upsert({
        where: { email: 'joe@gmail.com.br' },
        update: {},
        create: {
            name: 'Joe Down',
            email: 'joe@gmail.com.br',
            password,
        },
    });
    console.log('👤 User created successfully...✅');

    console.log('🏦 Creating bank account...');
    const bankAccount = await prisma.bankAccount.create({
        data: {
            name: 'Nubank',
            color: '#993399',
            initialBalance: 203.32,
            type: 'CHECKING',
            userId: user.id,
        },
    });
    console.log('🏦 Bank account created successfully...✅');

    const categories = await prisma.category.create({
        data: {
            name: 'Entreterimento',
            icon: '',
            type: 'EXPENSE',
            userId: user.id,
        },
    });

    console.log('💸 Creating transaction...');

    const transactions = [
        {
            name: 'Netflix',
            value: 20.99,
            date: new Date(),
            type: TransactionType.EXPENSE,
        },
        {
            name: 'Spotify',
            value: 18.99,
            date: new Date(),
            type: TransactionType.EXPENSE,
        },
        {
            name: 'Salário',
            value: 3700,
            date: new Date(),
            type: TransactionType.INCOME,
        },
    ];
    for (const transaction of transactions) {
        await prisma.transaction.create({
            data: {
                ...transaction,
                userId: user.id,
                categoryId: categories.id,
                backAccountId: bankAccount.id,
            },
        });
    }
    console.log('💸 Transactions created successfully...✅');
}

seed()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1);
    });
