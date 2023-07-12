import { InputType, Field, ID } from '@nestjs/graphql'
import { IsUUID } from 'class-validator'

@InputType()
export class WalletInput {
    @Field(() => ID, { description: 'Wallet id' })
    @IsUUID('4')
    id: string
}
