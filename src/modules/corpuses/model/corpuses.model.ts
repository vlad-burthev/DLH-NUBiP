import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
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
  @Column({ autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Faculties)
  @Column({ field: 'faculry_id', allowNull: false })
  facultyId: number;
  @BelongsTo(() => Faculties)
  faculty: Faculties;

  @Column({ unique: true, allowNull: false })
  title: string;

  @Column({ allowNull: false })
  description: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  latitude: number;

  @Column({ type: DataType.FLOAT })
  longitude: number;

  @Column({ allowNull: false })
  isDinning: boolean;

  @Column({ allowNull: false })
  isRector: boolean;

  @Column({ allowNull: false, unique: true })
  address: string;

  @Column({ allowNull: false, unique: true })
  phone: string;
}
