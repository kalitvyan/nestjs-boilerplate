import { NotFoundException } from '@nestjs/common'

export class TransactionNotFoundException extends NotFoundException {
    constructor(id: string) {
        super(`Transaction ${id} not found`)
    }
}
