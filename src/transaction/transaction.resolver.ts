import { Resolver, Query, Mutation, Args, Float } from '@nestjs/graphql'

import { WalletInput } from 'src/wallet/dto/wallet.input'

import { CreateTransactionInput } from './dto/create-transaction.input'
// import { UpdateTransactionInput } from './dto/update-transaction.input'
import { Transaction } from './entities/transaction.entity'
import { TransactionTypes } from './enums/transaction-types.enum'
import { TransactionService } from './transaction.service'

@Resolver(() => Transaction)
export class TransactionResolver {
    constructor(private readonly _transactionService: TransactionService) {}

    @Mutation(() => Transaction)
    createTransaction(
        @Args('createTransactionInput')
        createTransactionInput: CreateTransactionInput,
        @Args('wallet') wallet: WalletInput,
    ): Promise<Transaction> {
        return this._transactionService.create(createTransactionInput, wallet)
    }

    @Query(() => [Transaction], { name: 'transactions' })
    findAll(): Promise<Transaction[]> {
        return this._transactionService.findAll()
    }

    @Query(() => Transaction, { name: 'transaction' })
    findOne(
        @Args('id', { type: () => String }) id: string,
    ): Promise<Transaction> {
        return this._transactionService.findOne(id)
    }

    @Mutation(() => Transaction)
    deposit(
        @Args('amount', { type: () => Float }) amount: number,
        @Args('wallet') wallet: WalletInput,
    ): Promise<Transaction> {
        const transaction = {
            type: TransactionTypes.Deposite,
            amount,
        }

        return this._transactionService.create(transaction, wallet)
    }

    @Mutation(() => Transaction)
    withdraw(
        @Args('amount', { type: () => Float }) amount: number,
        @Args('wallet') wallet: WalletInput,
    ): Promise<Transaction> {
        const transaction = {
            type: TransactionTypes.Withdraw,
            amount,
        }

        return this._transactionService.create(transaction, wallet)
    }

    // @Mutation(() => Transaction)
    // updateTransaction(
    //     @Args('updateTransactionInput')
    //     updateTransactionInput: UpdateTransactionInput,
    // ) {
    //     return this.transactionService.update(
    //         updateTransactionInput.id,
    //         updateTransactionInput,
    //     )
    // }

    // @Mutation(() => Transaction)
    // removeTransaction(@Args('id', { type: () => String }) id: string): Promise<void> {
    //     return this._transactionService.remove(id)
    // }
}
