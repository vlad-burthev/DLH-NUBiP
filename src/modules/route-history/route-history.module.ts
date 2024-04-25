import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { RouteHistoryController } from './route-history.controller';
import { RouteHistoryService } from './route-history.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { RouteHistory } from './model/route-history.model';
import { CheckAuthMiddleware } from 'src/middlewares/checkAuthMiddleware';

@Module({
  controllers: [RouteHistoryController],
  providers: [RouteHistoryService],
  imports: [SequelizeModule.forFeature([RouteHistory])],
})
export class RouteHistoryModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuthMiddleware)
      .forRoutes({ path: 'route-history/*', method: RequestMethod.ALL });
  }
}
