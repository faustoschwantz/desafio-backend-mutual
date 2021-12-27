import { TransferBetweenAccountsDto } from 'src/application/account/dto/transfer-account.dto';

export interface ITransferBetweenAccountsService {
  execute(
    senderAccountId: string,
    createMovementDto: TransferBetweenAccountsDto,
  ): Promise<void>;
}
