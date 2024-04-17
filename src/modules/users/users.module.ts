import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './model/users.model';
import { CheckAuthMiddleware } from 'src/middlewares/checkAuthMiddleware';
import { FacultiesService } from '../faculties/faculties.service';
import { CheckRoleMiddleware } from 'src/middlewares/checkRoleMiddleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService, FacultiesService],
  imports: [SequelizeModule.forFeature([Users])],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckRoleMiddleware)
      .forRoutes({ path: 'users/delete-user/*', method: RequestMethod.POST });
    consumer
      .apply(CheckAuthMiddleware)
      .forRoutes({ path: 'users/check-auth', method: RequestMethod.GET });
  }
}
