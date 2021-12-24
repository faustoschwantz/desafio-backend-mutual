import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsPositive } from 'class-validator';

export class CreateMovementDto {
  @ApiProperty({
    description: 'Customer identification code',
    example: '61c5001bcba449dd48a2eb57',
  })
  @IsMongoId()
  accountId: string;

  @ApiProperty({
    description: 'Credit value',
    example: 5000,
  })
  @IsPositive()
  value: number;
}
