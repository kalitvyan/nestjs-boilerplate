import { HttpException, HttpStatus } from '@nestjs/common'

export class UserDeletedException extends HttpException {
    constructor(id: number) {
        super(`User ${id} permanently deleted`, HttpStatus.UNPROCESSABLE_ENTITY)
    }
}
