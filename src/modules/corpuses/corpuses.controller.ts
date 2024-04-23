import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response, query } from 'express';
import { CreateCorpusDto, ModifyCorpusDto } from './dto/corpuses.dto';
import { CorpusesService } from './corpuses.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Corpuses } from './model/corpuses.model';

@ApiTags('Корпуси')
@Controller('corpuses')
export class CorpusesController {
  constructor(private readonly corpusService: CorpusesService) {}

  @Post('create-corpus')
  @ApiOperation({ summary: 'Створення корпусу' })
  @ApiResponse({ status: 200, type: Corpuses })
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
    return this.corpusService.createCorpus(res, corpus, corpusImages);
  }

  @Post('delete-corpus/:id')
  @ApiOperation({ summary: 'Видалення корпусу' })
  @ApiResponse({ status: 200, description: 'Successfully' })
  deleteCorpusById(@Res() res: Response, @Param('id') id: number) {
    return this.corpusService.deleteCorpus(res, id);
  }

  @Patch('modify-corpus')
  @ApiOperation({ summary: 'Змінення корпусу' })
  @ApiResponse({ status: 200 })
  modifyCorpusById(@Res() res: Response, @Body() req: ModifyCorpusDto) {
    return this.corpusService.modifyCorpus(res, req);
  }

  @Get('get-all-corpuses')
  @ApiOperation({ summary: 'Отримати всі корпуси' })
  @ApiResponse({ status: 200, type: Corpuses })
  @ApiQuery({ name: 'page', type: 'number' })
  getAllCorpuses(
    @Res() res: Response,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.corpusService.getAllCorpuses(res, page, pageSize);
  }

  @Get('get-one-corpus/:id')
  getOneCorpusById(@Res() res: Response, @Param('id') id: number) {
    return this.corpusService.getOneCorpus(res, id);
  }
}
