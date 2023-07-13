import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserModule } from 'src/user/user.module'

import { Wallet } from './entities/wallet.entity'
import { WalletResolver } from './wallet.resolver'
import { WalletService } from './wallet.service'

@Module({
    imports: [TypeOrmModule.forFeature([Wallet]), UserModule],
    providers: [WalletResolver, WalletService],
    exports: [WalletService],
})
export class WalletModule {}
