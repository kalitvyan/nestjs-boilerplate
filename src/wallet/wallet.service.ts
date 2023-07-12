import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateWalletInput } from './dto/create-wallet.input'
// import { UpdateWalletInput } from './dto/update-wallet.input'
import { Wallet } from './entities/wallet.entity'
import { WalletClosedException } from './exceptions/walletClosed.exception'
import { WalletNotFoundException } from './exceptions/walletNotFound.exception'

@Injectable()
export class WalletService {
    constructor(
        @InjectRepository(Wallet) private _walletRepository: Repository<Wallet>,
    ) {}

    async create(createWalletInput: CreateWalletInput): Promise<Wallet> {
        const wallet = this._walletRepository.create(createWalletInput)

        return await this._walletRepository.save(wallet)
    }

    async isAvailable(id: string): Promise<Wallet> {
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
        const response = await this._walletRepository.softDelete(id)

        if (!response.affected) {
            throw new WalletNotFoundException(id)
        }

        return true
    }

    async findAll(): Promise<Wallet[]> {
        return await this._walletRepository.find({ withDeleted: true })
    }

    async findOne(id: string): Promise<Wallet> {
        // return await this._walletRepository.findOneOrFail(uuid)

        const wallet = await this.isAvailable(id)

        return wallet
    }

    // async update(id: string, updateWalletInput: UpdateWalletInput): Promise<Wallet> {
    //     await this._walletRepository.save(updateWalletInput)
    //     return await this._walletRepository.findOneOrFail(id)
    // }

    // async remove(id: string): Promise<void> {
    //     await this._walletRepository.delete(id)
    // }
}
