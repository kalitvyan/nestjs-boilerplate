import { InputType, Field, PartialType } from '@nestjs/graphql'

import { CreateWalletInput } from './create-wallet.input'

@InputType()
export class UpdateWalletInput extends PartialType(CreateWalletInput) {
    @Field(() => String)
    name: string
}
