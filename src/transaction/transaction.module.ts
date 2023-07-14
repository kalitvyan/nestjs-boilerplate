import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { WalletModule } from 'src/wallet/wallet.module'

import { Transaction } from './entities/transaction.entity'
import { TransactionResolver } from './transaction.resolver'
import { TransactionService } from './transaction.service'

@Module({
    imports: [TypeOrmModule.forFeature([Transaction]), WalletModule],
    providers: [TransactionResolver, TransactionService],
    exports: [TransactionService],
})
export class TransactionModule {}
