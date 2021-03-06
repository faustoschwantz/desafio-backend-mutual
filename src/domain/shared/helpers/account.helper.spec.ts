import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountBalanceDto } from 'src/application/account/dto/account-balance.dto';
import { IAccountRepository } from 'src/domain/interfaces/repositories/account-repository.interface';
import { IMovementRepository } from 'src/domain/interfaces/repositories/movement-repository.interface';
import { Account } from 'src/infrastructure/schemas/account.schema';
import { AccountHelper } from './account.helper';

const balanceFake = 10;
const accountIdFake = 'any-id';

const accountFake: Account = {
  cpf: 'any-cpf',
  name: 'any-name',
};

const accountIdsFake = [accountIdFake, accountIdFake];

describe('AccountHelper', () => {
  let helper: AccountHelper;
  let accountRepositoryStub: IAccountRepository;
  let movementRepositoryStub: IMovementRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'AccountHelper',
          useClass: AccountHelper,
        },
        {
          provide: 'IAccountRepository',
          useFactory: (): Partial<IAccountRepository> => ({
            getById: jest.fn(
              async (_id: string): Promise<Account> => accountFake,
            ),
          }),
        },
        {
          provide: 'IMovementRepository',
          useFactory: (): Partial<IMovementRepository> => ({
            getBalanceByAccountId: jest.fn(
              async (_accountId: string): Promise<AccountBalanceDto> => ({
                balance: balanceFake,
              }),
            ),
          }),
        },
      ],
    }).compile();

    helper = module.get<AccountHelper>('AccountHelper');
    accountRepositoryStub =
      module.get<IAccountRepository>('IAccountRepository');
    movementRepositoryStub = module.get<IMovementRepository>(
      'IMovementRepository',
    );
  });

  it('should be defined', () => {
    expect(helper).toBeDefined();
    expect(accountRepositoryStub).toBeDefined();
    expect(movementRepositoryStub).toBeDefined();
  });

  describe('When call the validateAccountBalance', () => {
    it('Should be return a UnprocessableEntityException if Insufficient funds', async () => {
      const getBalanceByAccountIdSpy = jest
        .spyOn(movementRepositoryStub, 'getBalanceByAccountId')
        .mockReturnValue(Promise.resolve({ balance: balanceFake - 1 }));

      const responsePromise = helper.validateAccountBalance(
        accountIdFake,
        balanceFake,
      );

      await expect(responsePromise).rejects.toThrow(
        UnprocessableEntityException,
      );
      expect(getBalanceByAccountIdSpy).toBeCalledWith(accountIdFake);
    });

    it('Should be call all methods correctly', async () => {
      const getBalanceByAccountIdSpy = jest.spyOn(
        movementRepositoryStub,
        'getBalanceByAccountId',
      );

      const response = await helper.validateAccountBalance(
        accountIdFake,
        balanceFake,
      );

      expect(getBalanceByAccountIdSpy).toBeCalledWith(accountIdFake);
      expect(response).toBeUndefined();
    });
  });

  describe('When call the validateAccountsFound', () => {
    it('Should be return a NotFoundException if accounts do not found', async () => {
      const getByIdSpy = jest
        .spyOn(accountRepositoryStub, 'getById')
        .mockReturnValue(undefined);

      const responsePromise = helper.validateAccountsFound(...accountIdsFake);

      await expect(responsePromise).rejects.toThrow(NotFoundException);
      expect(getByIdSpy).toBeCalledTimes(accountIdsFake.length);

      accountIdsFake.forEach((id) => {
        expect(getByIdSpy).toBeCalledWith(id);
      });
    });

    it('Should be call all methods correctly', async () => {
      const getByIdSpy = jest.spyOn(accountRepositoryStub, 'getById');

      const response = await helper.validateAccountsFound(...accountIdsFake);

      expect(response).toBeUndefined();
      expect(getByIdSpy).toBeCalledTimes(accountIdsFake.length);

      accountIdsFake.forEach((id) => {
        expect(getByIdSpy).toBeCalledWith(id);
      });
    });
  });
});
