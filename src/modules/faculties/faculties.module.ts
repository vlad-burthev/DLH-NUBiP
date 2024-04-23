import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { FacultiesController } from './faculties.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Faculties } from './model/faculties.model';
import { CheckRoleMiddleware } from 'src/middlewares/checkRoleMiddleware';
import { FacultiesService } from './faculties.service';

@Module({
  controllers: [FacultiesController],
  providers: [FacultiesService],
  imports: [SequelizeModule.forFeature([Faculties])],
  exports: [FacultiesService],
})
export class FacultiesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckRoleMiddleware)
      .forRoutes(
        { path: 'faculties/create', method: RequestMethod.POST },
        { path: 'faculties/delete/*', method: RequestMethod.POST },
        { path: 'faculties/modify/*', method: RequestMethod.POST },
      );
  }
}
