import { ObjectType, Field, ID, Float } from '@nestjs/graphql'
import {
    CreateDateColumn,
    UpdateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    Column,
} from 'typeorm'

import { Wallet } from '../../wallet/entities/wallet.entity'
import { TransactionTypes } from '../enums/transaction-types.enum'

@ObjectType()
@Entity()
export class Transaction {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Field()
    @Column()
    type: TransactionTypes

    @Field(() => Float)
    @Column()
    amount: number

    @Field(() => Date)
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @Field(() => Date)
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @ManyToOne(() => Wallet, (wallet) => wallet.transactions, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({ name: 'wallet_id' })
    @Field(() => Wallet)
    wallet: Wallet
}
