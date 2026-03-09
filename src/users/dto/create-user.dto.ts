import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'email.email.com', description: 'Электронная почта' })
  @IsString({ message: 'Must be String' })
  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;

  @ApiProperty({ example: 'password', description: 'Пароль' })
  @IsString({ message: 'Must be String' })
  @Length(4, 16, { message: 'Must be > 4 and < 16' })
  readonly password: string;
}
