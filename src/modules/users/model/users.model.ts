import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  DataType,
  Model,
  Column,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import { Faculties } from 'src/modules/faculties/model/faculties.model';

export interface I_UserCreateAttrs {
  id: number;
  email: string;
  password: string;
  role: string;
  facultyId: number;
}

@Table({ tableName: 'Users', timestamps: false })
export class Users extends Model<Users, I_UserCreateAttrs> {
  @ApiProperty({ example: '1', description: 'Унікальний індекс' })
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ApiProperty({ example: 'user', description: 'Роль користувача' })
  @Column({ defaultValue: 'user' })
  role: string;

  @ApiProperty({ example: '1', description: 'Id факультету' })
  @ForeignKey(() => Faculties)
  @Column({ field: 'faculty_id', allowNull: false })
  facultyId: number;
  @BelongsTo(() => Faculties)
  faculty: Faculties;

  @ApiProperty({
    example: 'user@gmail.com',
    description: 'Електорнна пошта користувача',
  })
  @Column({ unique: true, allowNull: false })
  email: string;

  @ApiProperty({
    example: '$2b$10$Buc1LoTSOHK.CI3hOWiTb.eFeZy7u/a2VEaWy2T/0bk1y1QcVsіuue',
    description: 'Захешований пароль користувача',
  })
  @Column({ allowNull: false })
  password: string;
}
