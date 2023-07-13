import { ObjectType, Field, ID } from '@nestjs/graphql'
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

    @ManyToOne(() => User, (user) => user.wallets, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({ name: 'user_id' })
    @Field(() => User)
    user: User
}
