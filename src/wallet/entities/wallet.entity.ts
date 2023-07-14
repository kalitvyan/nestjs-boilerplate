import { ObjectType, Field, ID, Float, HideField } from '@nestjs/graphql'
import {
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
} from 'typeorm'

import { Transaction } from '../../transaction/entities/transaction.entity'
import { User } from '../../user/entities/user.entity'

@ObjectType()
@Entity()
export class Wallet {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Field(() => String)
    @Column()
    name: string

    @Field(() => Date)
    @CreateDateColumn()
    createdAt: Date

    @Field(() => Date)
    @UpdateDateColumn()
    updatedAt: Date

    @Field(() => Date)
    @DeleteDateColumn()
    deletedAt?: Date

    @OneToMany(() => Transaction, (transaction) => transaction.wallet, {
        eager: true,
    })
    @Field(() => [Transaction])
    transactions?: Transaction[]

    @ManyToOne(() => User, (user) => user.wallets, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn()
    @Field(() => User)
    user: User

    @HideField()
    deposits: number

    @HideField()
    withdraws: number

    @Field(() => Float)
    balance: number
}
