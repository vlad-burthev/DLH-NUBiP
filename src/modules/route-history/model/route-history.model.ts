import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Users } from 'src/modules/users/model/users.model';

export interface I_RouteHistory {
  id: number;
  userId: number;
  startLatitude: number;
  stratLongitude: number;
  endLatitude: number;
  endLongitude: number;
  date: string;
}

@Table({ tableName: 'RouteHistory', timestamps: false })
export class RouteHistory extends Model<RouteHistory, I_RouteHistory> {
  @ApiProperty({ example: 1, description: 'Id точки' })
  @Column({ autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 1, description: 'Id користувача' })
  @ForeignKey(() => Users)
  @Column({ field: 'user_id', allowNull: false, onDelete: 'CASCADE' })
  userId: number;
  @BelongsTo(() => Users)
  user: Users;

  @ApiProperty({
    example: 50.38145101624412,
    description: 'Широта',
  })
  @Column({ type: DataType.FLOAT, allowNull: false })
  startLatitude: number;

  @ApiProperty({
    example: 30.4957272025944,
    description: 'Довгота',
  })
  @Column({ type: DataType.FLOAT, allowNull: false })
  stratLongitude: number;

  @ApiProperty({
    example: 51.38145101624412,
    description: 'Широта',
  })
  @Column({ type: DataType.FLOAT, allowNull: false })
  endLatitude: number;

  @ApiProperty({
    example: 31.4957272025944,
    description: 'Довгота',
  })
  @Column({ type: DataType.FLOAT, allowNull: false })
  endLongitude: number;

  @ApiProperty({
    example: '22.04.2024',
    description: 'Дата створення маршруту',
  })
  @Column({ allowNull: false })
  date: string;
}
