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
        { path: 'faculties/add-faculty', method: RequestMethod.POST },
        { path: 'faculties/delete-faculty/*', method: RequestMethod.POST },
        { path: 'faculties/update-faculty/*', method: RequestMethod.POST },
      );
  }
}
