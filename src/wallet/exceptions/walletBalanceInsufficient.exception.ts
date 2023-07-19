import { InternalServerErrorException } from '@nestjs/common'

export class WalletBalanceInsufficient extends InternalServerErrorException {
    constructor(id: string) {
        super(`Wallet ${id} balance is insufficient`)
    }
}
