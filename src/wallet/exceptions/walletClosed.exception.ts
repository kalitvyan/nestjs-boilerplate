import { HttpException, HttpStatus } from '@nestjs/common'

export class WalletClosedException extends HttpException {
    constructor(id: string) {
        super(
            `Wallet ${id} permanently closed`,
            HttpStatus.UNPROCESSABLE_ENTITY,
        )
    }
}
