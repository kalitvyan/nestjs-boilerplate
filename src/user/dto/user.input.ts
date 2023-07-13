import { InputType, Field } from '@nestjs/graphql'
import { IsNumber } from 'class-validator'

@InputType()
export class UserInput {
    @Field(() => Number, { description: 'User id' })
    @IsNumber()
    id: number
}
