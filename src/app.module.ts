import { join } from 'path'

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'

import { config } from './config/config'
import { typeOrmConfig } from './config/typeorm.config'
import { TransactionModule } from './transaction/transaction.module'
import { UserModule } from './user/user.module'
import { WalletModule } from './wallet/wallet.module'

@Module({
    imports: [
        ConfigModule.forRoot(config),
        GraphQLModule.forRoot({
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            debug: true,
            playground: true,
        }),
        TypeOrmModule.forRootAsync(typeOrmConfig),
        TransactionModule,
        UserModule,
        WalletModule,
    ],
})
export class AppModule {}
