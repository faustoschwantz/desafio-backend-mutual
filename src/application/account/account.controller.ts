import { Controller, Post, Body, Inject, Get, Param } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { CreateAccountService } from 'src/domain/services/create-account.service';
import { GetAccountBalanceService } from 'src/domain/services/get-account-balance.service';
import { AccountBalanceDto } from './dto/account-balance.dto';
import { AccountDto } from './dto/account.dto';
import { CreateAccountDto } from './dto/create-account.dto';

@ApiTags('Exams')
@Controller('account')
export class AccountController {
  constructor(
    @Inject('ICreateAccountService')
    private readonly createAcountService: CreateAccountService,
    @Inject('IGetAccountBalanceService')
    private readonly getAccountBalanceService: GetAccountBalanceService,
  ) {}

  @Post()
  @ApiBody({ type: CreateAccountDto })
  @ApiCreatedResponse({ type: AccountDto })
  @ApiUnprocessableEntityResponse({
    description: 'CPF already exists',
  })
  create(@Body() createAccountDto: CreateAccountDto): Promise<AccountDto> {
    return this.createAcountService.execute(createAccountDto);
  }

  @Get(':id/balance')
  @ApiOkResponse({ type: AccountBalanceDto })
  @ApiNotFoundResponse({ description: 'Account not found' })
  @ApiParam({
    name: 'id',
    description: 'Account identification',
    type: String,
    example: '61c5001bcba449dd48a2eb57',
  })
  balance(@Param('id') id: string): Promise<AccountBalanceDto> {
    return this.getAccountBalanceService.execute(id);
  }
}
