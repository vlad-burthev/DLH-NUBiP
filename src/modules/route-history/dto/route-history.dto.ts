import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateRouteHistoryDto {
  @ApiProperty({ example: '1', description: 'Id користувача' })
  @IsNumber({}, { message: 'Invalid user id' })
  userId: number;

  @ApiProperty({
    example: 50.38145101624412,
    description: 'Широта',
  })
  @Min(-180, {
    message: 'Start Latitude must be greater than or equal to -180',
  })
  @Max(180, { message: 'Start Latitude must be less than or equal to 180' })
  startLatitude: number;

  @ApiProperty({
    example: 30.4957272025944,
    description: 'Довгота',
  })
  @Min(-180, {
    message: 'Start Longitude must be greater than or equal to -180',
  })
  @Max(180, { message: 'Start Longitude must be less than or equal to 180' })
  stratLongitude: number;

  @ApiProperty({
    example: 50.38145101624412,
    description: 'Широта',
  })
  @Min(-180, { message: 'End Latitude must be greater than or equal to -180' })
  @Max(180, { message: 'End Latitude must be less than or equal to 180' })
  endLatitude: number;

  @ApiProperty({
    example: 30.4957272025944,
    description: 'Довгота',
  })
  @Min(-180, { message: 'End Longitude must be greater than or equal to -180' })
  @Max(180, { message: 'End Longitude must be less than or equal to 180' })
  endLongitude: number;
}
