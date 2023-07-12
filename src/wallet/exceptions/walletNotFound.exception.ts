import { NotFoundException } from '@nestjs/common'

export class WalletNotFoundException extends NotFoundException {
    constructor(id: string) {
        super(`Wallet ${id} not found`)
    }
}
