import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CorpusesService } from './corpuses.service';
import { CorpusesController } from './corpuses.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Corpuses } from './model/corpuses.model';
import { CorpusesImageService } from '../corpuses-images/corpuses-image.service';
import { CheckRoleMiddleware } from 'src/middlewares/checkRoleMiddleware';

@Module({
  controllers: [CorpusesController],
  providers: [CorpusesService, CorpusesImageService],
  imports: [SequelizeModule.forFeature([Corpuses])],
})
export class CorpusesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckRoleMiddleware).forRoutes(
      {
        path: 'corpuses/create-corpus',
        method: RequestMethod.POST,
      },
      { path: 'corpuses/delete-corpus/*', method: RequestMethod.POST },
      { path: 'corpuses/modify-corpus', method: RequestMethod.PATCH },
    );
  }
}
