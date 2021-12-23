import { AccountDto } from 'src/application/account/dto/account.dto';
import { CreateAccountDto } from 'src/application/account/dto/create-account.dto';

export interface ICreateAccountService {
  execute(createAccountDto: CreateAccountDto): Promise<AccountDto>;
}
