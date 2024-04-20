import {
  IsBoolean,
  IsBooleanString,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateCorpusDto {
  @Length(1, 255, { message: 'Invalid faculty id' })
  facultyId: number;

  @IsString({ message: 'Invalid title' })
  @Length(2, 2555, { message: 'Title must be longer than 2 symbols' })
  title: string;

  @IsString({ message: 'Invalid description' })
  @Length(10, 2555, { message: 'Description must be longer than 10 symbols' })
  description: string;

  @Length(-180, 180, { message: 'Invalid latitude' })
  latitude: number;

  @Length(-180, 180, { message: 'Invalid longitude' })
  longitude: number;

  @IsBooleanString({ message: 'Invalid value' })
  isDinning: boolean;

  @IsBooleanString({ message: 'Invalid value' })
  isRector: boolean;

  @IsString({ message: 'Invalid address' })
  address: string;

  @Length(9, 13, { message: 'Invalid phone' })
  phone: string;
}
