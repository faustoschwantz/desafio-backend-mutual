import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account, AccountDocument } from '../schemas/account.schema';
import { IAccountRepository } from 'src/domain/interfaces/repositories/account-repository.interface';

@Injectable()
export class AccountRepository implements IAccountRepository {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
  ) {}

  async create(account: Account): Promise<string> {
    const createdAccount = new this.accountModel(account);
    await createdAccount.save();

    return createdAccount.id;
  }

  async getByCPF(cpf: string): Promise<Account> {
    return this.accountModel.findOne({ cpf }).exec();
  }

  async getById(id: string): Promise<Account> {
    return this.accountModel.findById(id).exec();
  }
}
