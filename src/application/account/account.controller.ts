import { Controller, Post, Body, Inject } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { CreateAccountService } from 'src/domain/services/create-account.service';
import { AccountDto } from './dto/account.dto';
import { CreateAccountDto } from './dto/create-account.dto';

@ApiTags('Exams')
@Controller('account')
export class AccountController {
  constructor(
    @Inject('ICreateAccountService')
    private readonly createAcountService: CreateAccountService,
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
}
