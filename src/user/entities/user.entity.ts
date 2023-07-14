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

import { Wallet } from '../../wallet/entities/wallet.entity'

@ObjectType()
@Entity()
export class User {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String)
    @Column()
    name: string

    @Field(() => String)
    @Column({ unique: true })
    email: string

    @Field(() => Date)
    @CreateDateColumn()
    createdAt: Date

    @Field(() => Date)
    @UpdateDateColumn()
    updatedAt: Date

    @Field(() => Date)
    @DeleteDateColumn()
    deletedAt?: Date

    @OneToMany(() => Wallet, (wallet) => wallet.user, {
        eager: true,
    })
    @Field(() => [Wallet])
    wallets?: Wallet[]
}
