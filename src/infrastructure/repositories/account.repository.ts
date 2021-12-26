import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account, AccountDocument } from '../schemas/account.schema';
import { IAccountRepository } from 'src/domain/interfaces/repositories/account-repository.interface';
import { BaseRepository } from './base.repository';

@Injectable()
export class AccountRepository
  extends BaseRepository<AccountDocument>
  implements IAccountRepository
{
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
  ) {
    super(accountModel);
  }

  async getByCPF(cpf: string): Promise<Account> {
    return this.accountModel.findOne({ cpf }).exec();
  }

  async getById(id: string): Promise<Account> {
    return this.accountModel.findById(id).exec();
  }
}
