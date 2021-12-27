import { Test, TestingModule } from '@nestjs/testing';
import { AccountBalanceDto } from 'src/application/account/dto/account-balance.dto';
import { IAccountRepository } from 'src/domain/interfaces/repositories/account-repository.interface';
import { IMovementRepository } from 'src/domain/interfaces/repositories/movement-repository.interface';
import { Account } from 'src/infrastructure/schemas/account.schema';
import { AccountHelper } from './account.helper';

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
            getById: jest.fn((_id: string): Promise<Account> => undefined),
          }),
        },
        {
          provide: 'IMovementRepository',
          useFactory: (): Partial<IMovementRepository> => ({
            getBalanceByAccountId: jest.fn(
              (_accountId: string): Promise<AccountBalanceDto> => undefined,
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
});
