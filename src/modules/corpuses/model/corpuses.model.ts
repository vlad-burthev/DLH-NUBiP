import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { CorpusesImage } from 'src/modules/corpuses-images/model/corpuses-image.model';
import { Faculties } from 'src/modules/faculties/model/faculties.model';

interface I_Corpuses {
  id: number;
  facultyId: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  isDinning: boolean;
  isRector: boolean;
  address: string;
  phone: string;
}

@Table({ tableName: 'Corpuses', timestamps: false })
export class Corpuses extends Model<Corpuses, I_Corpuses> {
  @ApiProperty({ example: '1', description: 'Унікальний індекс' })
  @Column({ autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'Id факультету',
  })
  @ForeignKey(() => Faculties)
  @Column({ field: 'faculry_id', allowNull: false })
  facultyId: number;
  @BelongsTo(() => Faculties)
  faculty: Faculties;

  @ApiProperty({
    example: 'Факультет інформаційних технологій',
    description: 'Назва корпусу',
  })
  @Column({ unique: true, allowNull: false })
  title: string;

  @ApiProperty({
    example: 'Факультет для студентів ІТ факултету',
    description: 'Id факультету',
  })
  @Column({ allowNull: false })
  description: string;

  @ApiProperty({
    example: 50.38145101624412,
    description: 'Широта',
  })
  @Column({ type: DataType.FLOAT, allowNull: false })
  latitude: number;

  @ApiProperty({
    example: 30.4957272025944,
    description: 'Довгота',
  })
  @Column({ type: DataType.FLOAT })
  longitude: number;

  @ApiProperty({
    example: true,
    description: 'Чи є їдальня в корпусі ?',
  })
  @Column({ allowNull: false })
  isDinning: boolean;

  @ApiProperty({
    example: true,
    description: 'Чи є каб. ректора в корпусі ?',
  })
  @Column({ allowNull: false })
  isRector: boolean;

  @ApiProperty({
    example: 'вулиця Героїв Оборони, 16а, Київ, 03041',
    description: 'Адреса',
  })
  @Column({ allowNull: false, unique: true })
  address: string;

  @ApiProperty({
    example: '0445278352',
    description: 'Номер телефону деканату',
  })
  @Column({ allowNull: false, unique: true })
  phone: string;

  @HasOne(() => CorpusesImage)
  image: CorpusesImage;
}
