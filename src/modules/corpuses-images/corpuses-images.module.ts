import { Module } from '@nestjs/common';
import { CorpusesImageService } from './corpuses-image.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CorpusesImage } from './model/corpuses-image.module';

@Module({
  providers: [CorpusesImageService],
  imports: [SequelizeModule.forFeature([CorpusesImage])],
  exports: [CorpusesImageService],
})
export class CorpusesImageModule {}
