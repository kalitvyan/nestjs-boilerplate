import { InputType, Field } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class CreateWalletInput {
    @Field(() => String, { description: 'Wallet name' })
    @IsString()
    name: string
}
