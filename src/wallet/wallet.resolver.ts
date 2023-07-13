import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'

import { UserInput } from 'src/user/dto/user.input'

import { CreateWalletInput } from './dto/create-wallet.input'
import { Wallet } from './entities/wallet.entity'
import { WalletService } from './wallet.service'

@Resolver(() => Wallet)
export class WalletResolver {
    constructor(private readonly _walletService: WalletService) {}

    @Mutation(() => Wallet)
    createWallet(
        @Args('createWalletInput') createWalletInput: CreateWalletInput,
        @Args('user') user: UserInput,
    ): Promise<Wallet> {
        return this._walletService.create(createWalletInput, user)
    }

    @Mutation(() => Boolean)
    closeWallet(
        @Args('id', { type: () => String }) id: string,
    ): Promise<boolean> {
        return this._walletService.close(id)
    }

    @Query(() => [Wallet], { name: 'wallets' })
    findAll(): Promise<Wallet[]> {
        return this._walletService.findAll()
    }

    @Query(() => Wallet, { name: 'wallet' })
    findOne(@Args('id', { type: () => String }) id: string): Promise<Wallet> {
        return this._walletService.findOne(id)
    }
}
