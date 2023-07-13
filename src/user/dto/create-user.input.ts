import { InputType, Field } from '@nestjs/graphql'
import { IsEmail, IsString } from 'class-validator'

@InputType()
export class CreateUserInput {
    @Field(() => String, { description: 'User name' })
    @IsString()
    name: string

    @Field(() => String, { description: 'User email' })
    @IsEmail()
    email: string
}
