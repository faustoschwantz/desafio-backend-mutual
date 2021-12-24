import { ApiProperty } from '@nestjs/swagger';

export class AccountBalanceDto {
  @ApiProperty({
    description: 'Account balance',
    example: 50000,
  })
  balance: number;
}
