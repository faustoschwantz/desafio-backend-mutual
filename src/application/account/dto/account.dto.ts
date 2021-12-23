import { ApiProperty } from '@nestjs/swagger';

export class AccountDto {
  @ApiProperty({
    description: 'Customer ID',
    example: '61c5001bcba449dd48a2eb57',
  })
  id: string;

  @ApiProperty({ description: 'Customer CPF', example: '03773894040' })
  cpf: string;

  @ApiProperty({ description: 'Customer name', example: 'John Doe' })
  name: string;
}
