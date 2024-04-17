import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@gmail.com',
    description: 'Електорна пошта користувача',
  })
  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;

  @ApiProperty({
    example: '12345678',
    description: 'Пароль користувача',
  })
  @Length(6, 16, {
    message: 'The password must be longer than 6 and shorter than 16',
  })
  readonly password: string;

  @ApiProperty({
    example: '1',
    description: 'Id факультету',
  })
  @IsNumber({}, { message: 'Invalid fuculty' })
  readonly facultyId: number;
}

export class LoginUser {
  @IsEmail({}, { message: 'Invalid email' })
  @ApiProperty({
    example: 'user@gmail.com',
    description: 'Електорна пошта користувача',
  })
  readonly email: string;

  @ApiProperty({
    example: '12345678',
    description: 'Пароль користувача',
  })
  @Length(6, 16, {
    message: 'Wrong password or email',
  })
  readonly password: string;
}
