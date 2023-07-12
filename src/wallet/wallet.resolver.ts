import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'

import { CreateWalletInput } from './dto/create-wallet.input'
// import { UpdateWalletInput } from './dto/update-wallet.input'
import { Wallet } from './entities/wallet.entity'
import { WalletService } from './wallet.service'

@Resolver(() => Wallet)
export class WalletResolver {
    constructor(private readonly _walletService: WalletService) {}

    @Mutation(() => Wallet)
    createWallet(
        @Args('createWalletInput') createWalletInput: CreateWalletInput,
    ): Promise<Wallet> {
        return this._walletService.create(createWalletInput)
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

    // @Mutation(() => Wallet)
    // updateWallet(
    //     @Args('updateWalletInput') updateWalletInput: UpdateWalletInput,
    // ): Promise<Wallet> {
    //     return this._walletService.update(updateWalletInput.id, updateWalletInput)
    // }

    // @Mutation(() => Wallet)
    // removeWallet(@Args('id', { type: () => String }) id: string): Promise<void> {
    //     return this._walletService.remove(id)
    // }
}
