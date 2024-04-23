import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { CreateCorpusDto, ModifyCorpusDto } from './dto/corpuses.dto';
import { Corpuses } from './model/corpuses.model';
import { Op } from 'sequelize';
import { CorpusesImageService } from '../corpuses-images/corpuses-image.service';
import * as path from 'path';
import * as fs from 'fs';
import {
  CorpusesImage,
  I_CorpusesImage,
} from '../corpuses-images/model/corpuses-image.model';

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

      await this.corpusesImageService.addCorpusImage(
        createdCorpus.id,
        corpusImages.filename,
      );

      return res.json({
        message: 'successfully',
      });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteCorpus(res: Response, id: number) {
    try {
      const existingCorpus: Corpuses = await Corpuses.findOne({
        where: { id },
      });
      const file: CorpusesImage = await CorpusesImage.findOne({
        where: { corpusId: id },
      });
      if (!existingCorpus) {
        throw new HttpException('Corpus doesn`t exist', HttpStatus.BAD_REQUEST);
      }

      await existingCorpus.destroy();
      if (file) {
        const filePath = path.join(
          __dirname,
          '..',
          '..',
          '..',
          'static',
          file.image,
        );
        fs.unlinkSync(filePath);
      }

      return res.status(200).json({ message: 'successfully' });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async modifyCorpus(res: Response, body: ModifyCorpusDto) {
    try {
      const existingCorpus = await Corpuses.findOne({
        where: { id: body.id },
      });

      if (!existingCorpus) {
        throw new HttpException('Corpus doesn`t exist', HttpStatus.BAD_REQUEST);
      }

      for (const key in body) {
        if (body.hasOwnProperty(key)) {
          existingCorpus[key] = body[key];
        }
      }

      await existingCorpus.save();
      return res.status(200).json({ message: 'successfully' });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllCorpuses(res: Response, page: number = 1, pageSize: number = 20) {
    try {
      const totalCorpuses = await Corpuses.count();
      const offset = page * pageSize - pageSize;
      const corpuses = await Corpuses.findAll({
        include: CorpusesImage,
        limit: pageSize,
        offset,
      });

      return res
        .status(200)
        .json({ corpuses, page, size: pageSize, total: totalCorpuses });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOneCorpus(res: Response, id: number) {
    try {
      const corpus = await Corpuses.findOne({
        where: { id },
        include: CorpusesImage,
      });

      if (!corpus) {
        throw new HttpException(
          'Corpus doesn`t exist',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return res.status(200).json(corpus);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
