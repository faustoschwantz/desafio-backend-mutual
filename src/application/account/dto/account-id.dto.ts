import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class AccountIdDto {
  @IsMongoId()
  @ApiProperty({
    name: 'id',
    description: 'Account identification',
    type: String,
    example: '61c5001bcba449dd48a2eb57',
  })
  id: string;
}
