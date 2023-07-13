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
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @Field(() => Date)
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @Field(() => Date)
    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt?: Date

    @OneToMany(() => Wallet, (wallet) => wallet.user, {
        eager: true,
    })
    @Field(() => [Wallet])
    wallets?: Wallet[]
}
