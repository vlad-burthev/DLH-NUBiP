import { ApiProperty } from '@nestjs/swagger';
import { Column, Table, DataType, Model } from 'sequelize-typescript';

export interface I_FacultyCreateAttrs {
  id: number;
  name: string;
}

@Table({ tableName: 'Faculties', timestamps: false })
export class Faculties extends Model<Faculties, I_FacultyCreateAttrs> {
  @ApiProperty({ example: '1', description: 'Унікальний індекс' })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
}
