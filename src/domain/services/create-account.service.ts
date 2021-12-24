import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AccountDto } from 'src/application/account/dto/account.dto';
import { CreateAccountDto } from 'src/application/account/dto/create-account.dto';
import { AccountRepository } from 'src/infrastructure/repositories/account.repository';
import { ICreateAccountService } from '../interfaces/services/create-acount-service.interface';

@Injectable()
export class CreateAccountService implements ICreateAccountService {
  constructor(
    @Inject('IAccountRepository')
    private readonly accountRepository: AccountRepository,
  ) {}

  async execute(createAccountDto: CreateAccountDto): Promise<AccountDto> {
    const foundAccount = await this.accountRepository.getByCPF(
      createAccountDto.cpf,
    );

    if (foundAccount)
      throw new UnprocessableEntityException('CPF already exists');

    const id = await this.accountRepository.create(createAccountDto);
    return { id, ...createAccountDto };
  }
}
