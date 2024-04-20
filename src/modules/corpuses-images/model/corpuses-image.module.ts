import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Corpuses } from 'src/modules/corpuses/model/corpuses.model';

export interface I_CorpusesImage {
  id: number;
  corpusId: number;
  image: string;
}

@Table({ tableName: 'CorpusesImage', timestamps: false })
export class CorpusesImage extends Model<CorpusesImage, I_CorpusesImage> {
  @Column({ autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Corpuses)
  @Column({ field: 'corpus_id', allowNull: false, onDelete: 'CASCADE' })
  corpusId: number;
  @BelongsTo(() => Corpuses)
  corpus: Corpuses;

  @Column({ allowNull: false })
  image: string;
}
