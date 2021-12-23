import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, Length, MaxLength } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({ description: 'Customer CPF', example: '03773894040' })
  @Length(11, 11)
  @IsNumberString()
  cpf: string;

  @ApiProperty({ description: 'Customer name', example: 'John Doe' })
  @IsNotEmpty()
  @MaxLength(50)
  name: string;
}
