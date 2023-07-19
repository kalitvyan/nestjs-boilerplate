import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateUserInput } from './dto/create-user.input'
import { User } from './entities/user.entity'
import { UserDeletedException } from './exceptions/userDeleted.exception'
import { UserNotFoundException } from './exceptions/userNotFound.exception'

@Injectable()
export class UserService {
    private _logger = new Logger(UserService.name)

    constructor(
        @InjectRepository(User) private _userRepository: Repository<User>,
    ) {}

    async create(createUserInput: CreateUserInput): Promise<User> {
        try {
            const user = this._userRepository.create(createUserInput)

            return await this._userRepository.save(user)
        } catch (error) {
            this._logger.error(error, 'UserService: create method error')

            throw new Error(error)
        }
    }

    async getUserIfAvailable(id: number): Promise<User> {
        const user = await this._userRepository.findOne(id, {
            withDeleted: true,
        })

        if (user?.deletedAt) {
            throw new UserDeletedException(id)
        }

        if (!user) {
            throw new UserNotFoundException(id)
        }

        return user
    }

    async findAll(): Promise<User[]> {
        return await this._userRepository.find({ withDeleted: false })
    }

    async findOne(id: number): Promise<User> {
        return await this.getUserIfAvailable(id)
    }

    async remove(id: number): Promise<boolean> {
        try {
            const removeUser = await this._userRepository.softDelete(id)

            if (!removeUser.affected) {
                throw new UserNotFoundException(id)
            }
        } catch (error) {
            this._logger.error(error, 'UserService: remove method error')

            if (error instanceof UserNotFoundException) {
                throw error
            }

            throw new Error(error)
        }

        return true
    }
}
