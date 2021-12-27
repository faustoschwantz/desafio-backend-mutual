import { Test, TestingModule } from '@nestjs/testing';
import { CreateMovementDto } from 'src/application/movement/dto/create-movement.dto';
import { IMovementRepository } from 'src/domain/interfaces/repositories/movement-repository.interface';
import { MovementHelper } from './movement.helper';

const movementFake: CreateMovementDto = {
  accountId: 'any-id',
  value: 10,
};

const DebitMovementFake: CreateMovementDto = {
  accountId: 'any-id',
  value: -10,
};

describe('MovementHelper', () => {
  let helper: MovementHelper;
  let movementRepositoryStub: IMovementRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'MovementHelper',
          useClass: MovementHelper,
        },
        {
          provide: 'IMovementRepository',
          useFactory: () => ({
            create: jest.fn(),
          }),
        },
      ],
    }).compile();

    helper = module.get<MovementHelper>('MovementHelper');
    movementRepositoryStub = module.get<IMovementRepository>(
      'IMovementRepository',
    );
  });

  it('should be defined', () => {
    expect(helper).toBeDefined();
    expect(movementRepositoryStub).toBeDefined();
  });

  describe('When call the createCreditMovement', () => {
    it('Should be call all methods correctly', async () => {
      const createSpy = jest.spyOn(movementRepositoryStub, 'create');

      const response = await helper.createCreditMovement(movementFake);

      expect(response).toBeUndefined();
      expect(createSpy).toBeCalledWith(movementFake);
    });
  });

  describe('When call the createDebitMovement', () => {
    it('Should be call all methods correctly', async () => {
      const createSpy = jest.spyOn(movementRepositoryStub, 'create');
      const response = await helper.createDebitMovement(movementFake);

      expect(response).toBeUndefined();
      expect(createSpy).toBeCalledWith(DebitMovementFake);
    });
  });
});
