import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'

import { CreateUserInput } from './dto/create-user.input'
import { User } from './entities/user.entity'
import { UserService } from './user.service'

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly _userService: UserService) {}

    @Mutation(() => User)
    createUser(
        @Args('createUserInput') createUserInput: CreateUserInput,
    ): Promise<User> {
        return this._userService.create(createUserInput)
    }

    @Query(() => [User], { name: 'users' })
    findAll(): Promise<User[]> {
        return this._userService.findAll()
    }

    @Query(() => User, { name: 'user' })
    findOne(@Args('id', { type: () => Int }) id: number): Promise<User> {
        return this._userService.findOne(id)
    }

    @Mutation(() => Boolean)
    removeUser(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
        return this._userService.remove(id)
    }
}
