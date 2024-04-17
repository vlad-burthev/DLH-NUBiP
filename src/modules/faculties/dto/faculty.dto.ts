import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateFacultyDto {
  @ApiProperty({
    example: 'Факультет інформаційних технологій',
    description: 'Назваа факультету',
  })
  @IsString()
  @Length(2, 80, { message: 'Invalid faculty name' })
  readonly name: string;
}
