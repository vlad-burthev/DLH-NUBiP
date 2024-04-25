import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Length } from 'class-validator';
import { Min, Max } from 'class-validator';

export class CreateUserPointDto {
  @ApiProperty({ example: 1, description: 'Id користувача' })
  @IsNumber({}, { message: 'Invalid user id' })
  userId: number;

  @ApiProperty({ example: '', description: '' })
  @Length(1, 70, { message: '' })
  title: string;

  @ApiProperty({ example: '', description: '' })
  @Length(1, 255, { message: '' })
  @IsOptional()
  description: string;

  @ApiProperty({
    example: 50.38145101624412,
    description: 'Широта',
  })
  @Min(-180, { message: 'Latitude must be greater than or equal to -180' })
  @Max(180, { message: 'Latitude must be less than or equal to 180' })
  latitude: number;

  @ApiProperty({
    example: 30.4957272025944,
    description: 'Довгота',
  })
  @Min(-180, { message: 'Longitude must be greater than or equal to -180' })
  @Max(180, { message: 'Longitude must be less than or equal to 180' })
  longitude: number;
}
