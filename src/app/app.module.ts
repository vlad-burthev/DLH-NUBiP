import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import configurations from 'src/config';
import { CorpusesImageService } from 'src/modules/corpuses-images/corpuses-image.service';
import { CorpusesImageModule } from 'src/modules/corpuses-images/corpuses-images.module';
import { CorpusesImage } from 'src/modules/corpuses-images/model/corpuses-image.model';
import { CorpusesController } from 'src/modules/corpuses/corpuses.controller';
import { CorpusesModule } from 'src/modules/corpuses/corpuses.module';
import { CorpusesService } from 'src/modules/corpuses/corpuses.service';
import { Corpuses } from 'src/modules/corpuses/model/corpuses.model';
import { FacultiesController } from 'src/modules/faculties/faculties.controller';
import { FacultiesModule } from 'src/modules/faculties/faculties.module';
import { FacultiesService } from 'src/modules/faculties/faculties.service';
import { Faculties } from 'src/modules/faculties/model/faculties.model';
import { UserPoints } from 'src/modules/user-points/model/user-points.model';
import { UserPointsController } from 'src/modules/user-points/user-points.controller';
import { UserPointsModule } from 'src/modules/user-points/user-points.module';
import { UserPointsService } from 'src/modules/user-points/user-points.service';
import { Users } from 'src/modules/users/model/users.model';
import { UsersController } from 'src/modules/users/users.controller';
import { UsersModule } from 'src/modules/users/users.module';
import { UsersService } from 'src/modules/users/users.service';
import { RouteHistoryService } from 'src/modules/route-history/route-history.service';
import { RouteHistoryController } from 'src/modules/route-history/route-history.controller';
import { RouteHistory } from 'src/modules/route-history/model/route-history.model';
import { RouteHistoryModule } from 'src/modules/route-history/route-history.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
    }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', '..', 'static'),
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        port: configService.get<number>('db_port'),
        host: configService.get<string>('db_host'),
        password: configService.get<string>('db_password'),
        username: configService.get<string>('db_owner'),
        database: configService.get<string>('db_name'),
        synchronize: true,
        autoLoadModels: true,
        models: [
          Users,
          Faculties,
          Corpuses,
          CorpusesImage,
          UserPoints,
          RouteHistory,
        ],
      }),
    }),
    UsersModule,
    FacultiesModule,
    CorpusesModule,
    CorpusesImageModule,
    UserPointsModule,
    RouteHistoryModule,
  ],
  controllers: [
    UsersController,
    FacultiesController,
    CorpusesController,
    UserPointsController,
    RouteHistoryController,
  ],
  providers: [
    UsersService,
    FacultiesService,
    CorpusesService,
    CorpusesImageService,
    UserPointsService,
    RouteHistoryService,
  ],
})
export class AppModule {}
