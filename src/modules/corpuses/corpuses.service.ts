import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { CreateCorpusDto } from './dto/corpuses.dto';
import { Corpuses } from './model/corpuses.model';
import { Op } from 'sequelize';
import { CorpusesImageService } from '../corpuses-images/corpuses-image.service';

@Injectable()
export class CorpusesService {
  constructor(private readonly corpusesImageService: CorpusesImageService) {}

  async createCorpus(
    res: Response,
    corpus: CreateCorpusDto,
    corpusImages: Express.Multer.File,
  ) {
    try {
      const existingCorpus = await Corpuses.findOne({
        where: {
          [Op.or]: {
            title: corpus.title,
            address: corpus.address,
          },
        },
      });

      if (existingCorpus) {
        throw new HttpException(
          'Corpus with the same title or address already exist',
          HttpStatus.BAD_REQUEST,
        );
      }

      const createdCorpus = await Corpuses.create(corpus);

      const createdCorpusImage = await this.corpusesImageService.addCorpusImage(
        createdCorpus.id,
        corpusImages.filename,
      );

      return res.json({ createdCorpus, createdCorpusImage });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
