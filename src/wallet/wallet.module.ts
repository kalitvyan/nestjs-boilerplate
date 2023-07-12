import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Wallet } from './entities/wallet.entity'
import { WalletResolver } from './wallet.resolver'
import { WalletService } from './wallet.service'

@Module({
    imports: [TypeOrmModule.forFeature([Wallet])],
    providers: [WalletResolver, WalletService],
    exports: [WalletService],
})
export class WalletModule {}
