import {
  Body,
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateCorpusDto } from './dto/corpuses.dto';
import { CorpusesService } from './corpuses.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Controller('corpuses')
export class CorpusesController {
  constructor(private readonly corpusService: CorpusesService) {}

  @Post('create-corpus')
  @UseInterceptors(
    FileInterceptor('corpusImage', {
      storage: diskStorage({
        destination: path.resolve(__dirname, '..', '..', '..', 'static'),
        filename: (req, file, callback) => {
          const fileName = uuidv4() + path.extname(file.originalname);
          callback(null, fileName);
        },
      }),
    }),
  )
  createCorpus(
    @Res() res: Response,
    @Body() corpus: CreateCorpusDto,
    @UploadedFile() corpusImages: Express.Multer.File,
  ) {
    console.log(corpusImages);
    return this.corpusService.createCorpus(res, corpus, corpusImages);
  }
}
