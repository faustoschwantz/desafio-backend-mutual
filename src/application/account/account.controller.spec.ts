import { Test, TestingModule } from '@nestjs/testing';
import { ICreateAccountService } from 'src/domain/interfaces/services/create-acount-service.interface';
import { IGetAccountBalanceService } from 'src/domain/interfaces/services/get-account-balance-service.interface';
import { ITransferBetweenAccountsService } from 'src/domain/interfaces/services/transfer-between-accounts-service.interface';
import { AccountController } from './account.controller';
import { AccountBalanceDto } from './dto/account-balance.dto';
import { AccountIdDto } from './dto/account-id.dto';
import { AccountDto } from './dto/account.dto';
import { CreateAccountDto } from './dto/create-account.dto';
import { TransferBetweenAccountsDto } from './dto/transfer-account.dto';

const accountIdDtoFake: AccountIdDto = { id: 'any-id' };

const createMovementDtoFake: TransferBetweenAccountsDto = {
  accountId: 'any-id',
  value: 500,
};

describe('AccountController', () => {
  let controller: AccountController;
  let createAccountServiceStub: ICreateAccountService;
  let getAccountBalanceServiceStub: IGetAccountBalanceService;
  let transferBetweenAccountsServiceStub: ITransferBetweenAccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        {
          provide: 'ICreateAccountService',
          useFactory: (): ICreateAccountService => ({
            execute: jest.fn(
              async (
                _createAccountDto: CreateAccountDto,
              ): Promise<AccountDto> => undefined,
            ),
          }),
        },
        {
          provide: 'IGetAccountBalanceService',
          useFactory: (): IGetAccountBalanceService => ({
            execute: jest.fn(
              async (_accountId: string): Promise<AccountBalanceDto> =>
                undefined,
            ),
          }),
        },
        {
          provide: 'ITransferBetweenAccountsService',
          useFactory: (): ITransferBetweenAccountsService => ({
            execute: jest.fn(
              async (
                _senderAccountId: string,
                _createMovementDto: TransferBetweenAccountsDto,
              ): Promise<void> => undefined,
            ),
          }),
        },
      ],
    }).compile();

    controller = module.get<AccountController>(AccountController);
    createAccountServiceStub = module.get<ICreateAccountService>(
      'ICreateAccountService',
    );
    getAccountBalanceServiceStub = module.get<IGetAccountBalanceService>(
      'IGetAccountBalanceService',
    );
    transferBetweenAccountsServiceStub =
      module.get<ITransferBetweenAccountsService>(
        'ITransferBetweenAccountsService',
      );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(createAccountServiceStub).toBeDefined();
    expect(getAccountBalanceServiceStub).toBeDefined();
    expect(transferBetweenAccountsServiceStub).toBeDefined();
  });

  describe('When a transfer between accounts is called', () => {
    it('Should be call the method transfer and execute the TransferBetweenAccountsService', async () => {
      const transferBetweenAccountsServiceSpy = jest.spyOn(
        transferBetweenAccountsServiceStub,
        'execute',
      );

      const response = await controller.transfer(
        accountIdDtoFake,
        createMovementDtoFake,
      );

      expect(transferBetweenAccountsServiceSpy).toBeCalledWith(
        accountIdDtoFake.id,
        createMovementDtoFake,
      );
      expect(response).toBeUndefined();
    });
  });
});
