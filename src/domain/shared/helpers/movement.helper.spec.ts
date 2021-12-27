import { Test, TestingModule } from '@nestjs/testing';
import { IMovementRepository } from 'src/domain/interfaces/repositories/movement-repository.interface';
import { MovementHelper } from './movement.helper';

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
          useFactory: (): Partial<IMovementRepository> => ({
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
});
