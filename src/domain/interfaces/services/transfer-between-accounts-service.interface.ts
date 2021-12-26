import { TransferBetweenAccountsDto } from 'src/application/account/dto/transfer-account.dto';

export interface ITransferBetweenAccountsService {
  execute(
    senderAccountId,
    createMovementDto: TransferBetweenAccountsDto,
  ): Promise<void>;
}
