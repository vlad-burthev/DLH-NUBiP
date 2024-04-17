import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import configurations from 'src/config';
import { FacultiesModule } from 'src/modules/faculties/faculties.module';
import { Faculties } from 'src/modules/faculties/model/faculties.model';
import { Users } from 'src/modules/users/model/users.model';
import { UsersController } from 'src/modules/users/users.controller';
import { UsersModule } from 'src/modules/users/users.module';
import { UsersService } from 'src/modules/users/users.service';

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
    // ServeStaticModule.forRoot({
    //   rootPath: path.resolve(__dirname, '..', '..', 'static'),
    // }),
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
        models: [Users, Faculties],
      }),
    }),
    UsersModule,
    FacultiesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
