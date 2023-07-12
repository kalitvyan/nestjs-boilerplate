import { Field, InputType } from '@nestjs/graphql'
import { IsEnum } from 'class-validator'

import { TransactionTypes } from '../enums/transaction-types.enum'

@InputType()
export class CreateTransactionInput {
    @Field({ description: 'Transaction type' })
    @IsEnum(TransactionTypes)
    type: TransactionTypes

    @Field({ description: 'Transaction amount' })
    amount: number
}
