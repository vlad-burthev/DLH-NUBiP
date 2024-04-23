import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CorpusesImage } from './model/corpuses-image.model';

@Injectable()
export class CorpusesImageService {
  async addCorpusImage(corpusId: number, image: string) {
    try {
      const createdCorpusImage = await CorpusesImage.create({
        corpusId,
        image,
      });

      return createdCorpusImage;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
