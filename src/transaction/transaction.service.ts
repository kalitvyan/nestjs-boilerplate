import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { WalletInput } from 'src/wallet/dto/wallet.input'
import { WalletService } from 'src/wallet/wallet.service'

import { CreateTransactionInput } from './dto/create-transaction.input'
import { Transaction } from './entities/transaction.entity'
import { TransactionNotFoundException } from './exceptions/transactionNotFound.exception'

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction)
        private _transactionRepository: Repository<Transaction>,
        private readonly _walletService: WalletService,
    ) {}

    async create(
        createTransactionInput: CreateTransactionInput,
        wallet: WalletInput,
    ): Promise<Transaction> {
        await this._walletService.isAvailable(wallet.id)

        const { type, amount } = createTransactionInput

        const transaction = this._transactionRepository.create({
            type,
            amount,
            wallet,
        })

        return await this._transactionRepository.save(transaction)
    }

    async findAll(): Promise<Transaction[]> {
        return await this._transactionRepository.find()
    }

    async findOne(id: string): Promise<Transaction> {
        const transaction = await this._transactionRepository.findOne(id)

        if (!transaction) {
            throw new TransactionNotFoundException(id)
        }

        return transaction
    }
}
