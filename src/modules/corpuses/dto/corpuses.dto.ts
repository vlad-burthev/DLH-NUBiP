import { ApiProperty } from '@nestjs/swagger';
import {
  IsBooleanString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { NotEmpty } from 'sequelize-typescript';

export class CreateCorpusDto {
  @ApiProperty({
    example: 1,
    description: 'Id факультету',
  })
  @Length(1, 255, { message: 'Invalid faculty id' })
  facultyId: number;

  @ApiProperty({
    example: 'Факультет інформаційних технологій',
    description: 'Назва корпусу',
  })
  @IsString({ message: 'Invalid title' })
  @Length(2, 2555, { message: 'Title must be longer than 2 symbols' })
  title: string;

  @ApiProperty({
    example: 'Факультет для студентів ІТ факултету',
    description: 'Опис факультету',
  })
  @IsString({ message: 'Description must be longer than 10 symbols' })
  @Length(10, 2555, { message: 'Description must be longer than 10 symbols' })
  description: string;

  @ApiProperty({
    example: 50.38145101624412,
    description: 'Широта',
  })
  @Length(-180, 180, { message: 'Invalid latitude' })
  latitude: number;

  @ApiProperty({
    example: 30.4957272025944,
    description: 'Довгота',
  })
  @Length(-180, 180, { message: 'Invalid longitude' })
  longitude: number;

  @ApiProperty({
    example: true,
    description: 'Чи є їдальня в корпусі ?',
  })
  @IsBooleanString({ message: 'Invalid value' })
  isDinning: boolean;

  @ApiProperty({
    example: true,
    description: 'Чи є каб. ректора в корпусі ?',
  })
  @IsBooleanString({ message: 'Invalid value' })
  isRector: boolean;

  @ApiProperty({
    example: 'вулиця Героїв Оборони, 16а, Київ, 03041',
    description: 'Адреса',
  })
  @IsString({ message: 'Invalid address' })
  address: string;

  @ApiProperty({
    example: '0445278352',
    description: 'Номер телефону деканату',
  })
  @Length(9, 13, { message: 'Invalid phone' })
  phone: string;
}

export class ModifyCorpusDto {
  @ApiProperty({
    example: 1,
    description: 'Id корпусу',
  })
  @IsNotEmpty()
  @IsNumber({}, { message: 'Invalid corpus id' })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'Id факультету',
  })
  @IsOptional()
  @Length(1, 255, { message: 'Invalid faculty id' })
  facultyId: number;

  @ApiProperty({
    example: 'Факультет інформаційних технологій',
    description: 'Назва корпусу',
  })
  @IsOptional()
  @IsString({ message: 'Invalid title' })
  @Length(2, 2555, { message: 'Title must be longer than 2 symbols' })
  title: string;

  @ApiProperty({
    example: 'Факультет для студентів ІТ факултету',
    description: 'Опис факультету',
  })
  @IsOptional()
  @IsString({ message: 'Description must be longer than 10 symbols' })
  @Length(10, 2555, { message: 'Description must be longer than 10 symbols' })
  description: string;

  @ApiProperty({
    example: 50.38145101624412,
    description: 'Широта',
  })
  @IsOptional()
  @Length(-180, 180, { message: 'Invalid latitude' })
  latitude: number;

  @ApiProperty({
    example: 30.4957272025944,
    description: 'Довгота',
  })
  @IsOptional()
  @Length(-180, 180, { message: 'Invalid longitude' })
  longitude: number;

  @ApiProperty({
    example: true,
    description: 'Чи є їдальня в корпусі ?',
  })
  @IsOptional()
  @IsBooleanString({ message: 'Invalid value' })
  isDinning: boolean;

  @ApiProperty({
    example: true,
    description: 'Чи є каб. ректора в корпусі ?',
  })
  @IsOptional()
  @IsBooleanString({ message: 'Invalid value' })
  isRector: boolean;

  @ApiProperty({
    example: 'вулиця Героїв Оборони, 16а, Київ, 03041',
    description: 'Адреса',
  })
  @IsOptional()
  @IsString({ message: 'Invalid address' })
  address: string;

  @ApiProperty({
    example: '0445278352',
    description: 'Номер телефону деканату',
  })
  @IsOptional()
  @Length(9, 13, { message: 'Invalid phone' })
  phone: string;
}
