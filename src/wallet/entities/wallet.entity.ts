import { ObjectType, Field, ID } from '@nestjs/graphql'
import {
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm'

import { Transaction } from '../../transaction/entities/transaction.entity'

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
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @Field(() => Date)
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @Field(() => Date)
    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt?: Date

    @OneToMany(() => Transaction, (transaction) => transaction.wallet, {
        eager: true,
    })
    @Field(() => [Transaction])
    transactions?: Transaction[]
}
