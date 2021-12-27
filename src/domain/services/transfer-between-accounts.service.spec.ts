import { Test, TestingModule } from '@nestjs/testing';
import { CreateMovementDto } from 'src/application/movement/dto/create-movement.dto';
import { AccountHelper } from '../shared/helpers/account.helper';
import { MovementHelper } from '../shared/helpers/movement.helper';
import { TransferBetweenAccountsService } from './transfer-between-accounts.service';

describe('TransferBetweenAccountsService', () => {
  let service: TransferBetweenAccountsService;
  let accountHelperStub: AccountHelper;
  let movementHelperStub: MovementHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'ITransferBetweenAccountsService',
          useClass: TransferBetweenAccountsService,
        },
        {
          provide: 'AccountHelper',
          useFactory: (): Partial<AccountHelper> => ({
            validateAccountsFound: jest.fn(
              async (..._accountIds: string[]) => null,
            ),
            validateAccountBalance: jest.fn(
              async (_senderAccountId: string, _value: number) => null,
            ),
          }),
        },
        {
          provide: 'MovementHelper',
          useFactory: (): Partial<MovementHelper> => ({
            createDebitMovement: jest.fn(
              async (_moviment: CreateMovementDto) => null,
            ),
            createCreditMovement: jest.fn(
              async (_moviment: CreateMovementDto) => null,
            ),
          }),
        },
      ],
    }).compile();

    service = module.get<TransferBetweenAccountsService>(
      'ITransferBetweenAccountsService',
    );
    accountHelperStub = module.get<AccountHelper>('AccountHelper');
    movementHelperStub = module.get<MovementHelper>('MovementHelper');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(accountHelperStub).toBeDefined();
    expect(movementHelperStub).toBeDefined();
  });
});
