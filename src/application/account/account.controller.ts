import { Controller, Post, Body, Inject, Get, Param } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { CreateAccountService } from 'src/domain/services/create-account.service';
import { GetAccountBalanceService } from 'src/domain/services/get-account-balance.service';
import { TransferBetweenAccountsService } from 'src/domain/services/transfer-between-accounts.service';
import { AccountBalanceDto } from './dto/account-balance.dto';
import { AccountIdDto } from './dto/account-id.dto';
import { AccountDto } from './dto/account.dto';
import { CreateAccountDto } from './dto/create-account.dto';
import { TransferBetweenAccountsDto } from './dto/transfer-account.dto';

@ApiTags('Exams')
@Controller('account')
export class AccountController {
  constructor(
    @Inject('ICreateAccountService')
    private readonly createAcountService: CreateAccountService,
    @Inject('IGetAccountBalanceService')
    private readonly getAccountBalanceService: GetAccountBalanceService,
    @Inject('ITransferBetweenAccountsService')
    private readonly transferBetweenAccountsService: TransferBetweenAccountsService,
  ) {}

  @Post()
  @ApiBody({ type: CreateAccountDto })
  @ApiCreatedResponse({ description: 'Created', type: AccountDto })
  @ApiUnprocessableEntityResponse({
    description: 'CPF already exists',
  })
  create(@Body() createAccountDto: CreateAccountDto): Promise<AccountDto> {
    return this.createAcountService.execute(createAccountDto);
  }

  @Get(':id/balance')
  @ApiOkResponse({ type: AccountBalanceDto })
  @ApiNotFoundResponse({ description: 'Account not found' })
  balance(@Param() { id }: AccountIdDto): Promise<AccountBalanceDto> {
    return this.getAccountBalanceService.execute(id);
  }

  @Post(':id/transfer')
  @ApiOkResponse({ type: AccountBalanceDto })
  @ApiNotFoundResponse({ description: 'Account not found' })
  @ApiBody({ type: TransferBetweenAccountsDto })
  transfer(
    @Param() { id }: AccountIdDto,
    @Body() { accountId, value }: TransferBetweenAccountsDto,
  ): Promise<void> {
    return this.transferBetweenAccountsService.execute(id, {
      accountId,
      value,
    });
  }
}
