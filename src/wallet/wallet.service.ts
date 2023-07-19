import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { TransactionTypes } from 'src/transaction/enums/transaction-types.enum'
import { UserInput } from 'src/user/dto/user.input'
import { UserService } from 'src/user/user.service'

import { CreateWalletInput } from './dto/create-wallet.input'
import { WalletInput } from './dto/wallet.input'
import { Wallet } from './entities/wallet.entity'
import { WalletClosedException } from './exceptions/walletClosed.exception'
import { WalletNotFoundException } from './exceptions/walletNotFound.exception'

@Injectable()
export class WalletService {
    private _logger = new Logger(WalletService.name)

    constructor(
        @InjectRepository(Wallet)
        private _walletRepository: Repository<Wallet>,
        private readonly _userService: UserService,
    ) {}

    async create(
        createWalletInput: CreateWalletInput,
        user: UserInput,
    ): Promise<Wallet> {
        await this._userService.getUserIfAvailable(user.id)

        try {
            const { name } = createWalletInput

            const wallet = this._walletRepository.create({
                name,
                user,
            })

            return await this._walletRepository.save(wallet)
        } catch (error) {
            this._logger.error(error, 'WalletService: create method error')

            throw new Error(error)
        }
    }

    async getWalletIfAvailable(id: string): Promise<Wallet> {
        const wallet = await this._walletRepository.findOne(id, {
            withDeleted: true,
        })

        if (wallet?.deletedAt) {
            throw new WalletClosedException(id)
        }

        if (!wallet) {
            throw new WalletNotFoundException(id)
        }

        return wallet
    }

    async close(id: string): Promise<boolean> {
        try {
            const closeWallet = await this._walletRepository.softDelete(id)

            if (!closeWallet.affected) {
                throw new WalletNotFoundException(id)
            }
        } catch (error) {
            this._logger.error(error, 'WalletService: close method error')

            if (error instanceof WalletNotFoundException) {
                throw error
            }

            throw new Error(error)
        }

        return true
    }

    async findAll(): Promise<Wallet[]> {
        return await this._walletRepository.find({ withDeleted: true })
    }

    async findOne(id: string): Promise<Wallet> {
        return await this.getWalletIfAvailable(id)
    }

    async getBalance(wallet: Wallet | WalletInput): Promise<number> {
        const { deposits, withdraws } = await this._walletRepository
            .createQueryBuilder('wallet')
            .where('wallet.id = :walletId', { walletId: wallet.id })
            .leftJoin('wallet.transactions', 'transactions')
            .select(
                `SUM(amount) FILTER (WHERE type = '${TransactionTypes.Deposite}')`,
                'deposits',
            )
            .addSelect(
                `SUM(amount) FILTER (WHERE type = '${TransactionTypes.Withdraw}')`,
                'withdraws',
            )
            .getRawOne()

        return deposits - withdraws
    }
}
