import { Controller, Post, Body, Inject } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCreditMovementService } from 'src/domain/services/create-credit-movement.service';
import { CreateCreditMovementDto } from './dto/create-credit-movement.dto';

@ApiTags('Movement')
@Controller('movement')
export class MovementController {
  constructor(
    @Inject('ICreateCreditMovementService')
    private readonly createdCreditMovementService: CreateCreditMovementService,
  ) {}

  @Post('credit')
  @ApiCreatedResponse()
  @ApiNotFoundResponse({ description: 'Account not found' })
  @ApiBody({ type: CreateCreditMovementDto })
  create(
    @Body() createCreditNovementtDto: CreateCreditMovementDto,
  ): Promise<void> {
    return this.createdCreditMovementService.execute(createCreditNovementtDto);
  }
}
