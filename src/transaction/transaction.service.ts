import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { WalletInput } from 'src/wallet/dto/wallet.input'
import { WalletBalanceInsufficient } from 'src/wallet/exceptions/walletBalanceInsufficient.exception'
import { WalletService } from 'src/wallet/wallet.service'

import { CreateTransactionInput } from './dto/create-transaction.input'
import { Transaction } from './entities/transaction.entity'
import { TransactionTypes } from './enums/transaction-types.enum'
import { TransactionNotFoundException } from './exceptions/transactionNotFound.exception'

@Injectable()
export class TransactionService {
    private _logger = new Logger(TransactionService.name)

    constructor(
        @InjectRepository(Transaction)
        private _transactionRepository: Repository<Transaction>,
        private readonly _walletService: WalletService,
    ) {}

    async create(
        createTransactionInput: CreateTransactionInput,
        wallet: WalletInput,
    ): Promise<Transaction> {
        await this._walletService.getWalletIfAvailable(wallet.id)

        const { type, amount } = createTransactionInput

        if (type === TransactionTypes.Withdraw) {
            const balance = await this._walletService.getBalance(wallet)

            if (balance < amount) {
                throw new WalletBalanceInsufficient(wallet.id)
            }
        }

        try {
            const transaction = this._transactionRepository.create({
                type,
                amount,
                wallet,
            })

            return await this._transactionRepository.save(transaction)
        } catch (error) {
            this._logger.error(error, 'TransactionService: create method error')

            throw new Error(error)
        }
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
