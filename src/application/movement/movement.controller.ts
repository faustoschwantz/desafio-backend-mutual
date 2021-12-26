import { Controller, Post, Body, Inject } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { CreateCreditMovementService } from 'src/domain/services/create-credit-movement.service';
import { CreateDebitMovementService } from 'src/domain/services/create-debit-movement.service';
import { CreateMovementDto } from './dto/create-movement.dto';

@ApiTags('Movement')
@Controller('movement')
export class MovementController {
  constructor(
    @Inject('ICreateCreditMovementService')
    private readonly createdCreditMovementService: CreateCreditMovementService,
    @Inject('ICreateDebitMovementService')
    private readonly createdDebitMovementService: CreateDebitMovementService,
  ) {}

  @Post('credit')
  @ApiCreatedResponse({ description: 'Created' })
  @ApiNotFoundResponse({ description: 'Account not found' })
  @ApiBody({ type: CreateMovementDto })
  createCredit(
    @Body() createCreditMovementDto: CreateMovementDto,
  ): Promise<void> {
    return this.createdCreditMovementService.execute(createCreditMovementDto);
  }

  @Post('debit')
  @ApiCreatedResponse({ description: 'Created' })
  @ApiNotFoundResponse({ description: 'Account not found' })
  @ApiUnprocessableEntityResponse({ description: 'Insufficient funds' })
  @ApiBody({ type: CreateMovementDto })
  createDebit(
    @Body() createCreditMovementDto: CreateMovementDto,
  ): Promise<void> {
    return this.createdDebitMovementService.execute(createCreditMovementDto);
  }
}
