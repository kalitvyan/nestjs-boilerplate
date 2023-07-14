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
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    amount: number

    @Field(() => Date)
    @CreateDateColumn()
    createdAt: Date

    @Field(() => Date)
    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => Wallet, (wallet) => wallet.transactions, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn()
    @Field(() => Wallet)
    wallet: Wallet
}
