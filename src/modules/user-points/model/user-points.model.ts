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

export interface I_UserPoints {
  id: number;
  userId: number;
  title: string;
  description: string;
  lat: number;
  long: number;
}

@Table({ tableName: 'UserPoint', timestamps: false })
export class UserPoints extends Model<UserPoints, I_UserPoints> {
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
    example: 'Кулиничі',
    description: 'Точка яку додав користувач',
  })
  @Column({ allowNull: false, unique: true })
  title: string;

  @ApiProperty({
    example: 'Місто де я їм',
    description: 'Опис доданої точки',
  })
  @Column({ type: DataType.CHAR })
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
  @Column({ type: DataType.FLOAT, allowNull: false })
  longitude: number;
}
