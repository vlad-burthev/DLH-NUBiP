import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserPointsController } from './user-points.controller';
import { UserPointsService } from './user-points.service';
import { UserPoints } from './model/user-points.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { CheckAuthMiddleware } from 'src/middlewares/checkAuthMiddleware';

@Module({
  controllers: [UserPointsController],
  providers: [UserPointsService],
  imports: [SequelizeModule.forFeature([UserPoints])],
})
export class UserPointsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckAuthMiddleware).forRoutes({
      path: 'user-points/*',
      method: RequestMethod.ALL,
    });
  }
}
