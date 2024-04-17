import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { I_UserCreateAttrs, Users } from './model/users.model';
import { InjectModel } from '@nestjs/sequelize';
import { Request, Response } from 'express';
import { CreateUserDto, LoginUser } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as cookie from 'cookie';
import { ConfigService } from '@nestjs/config';
import { FacultiesService } from '../faculties/faculties.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
    private readonly facultiesService: FacultiesService,
  ) {}

  async createUser(res: Response, userDto: CreateUserDto) {
    try {
      const existingUser: I_UserCreateAttrs = await Users.findOne({
        where: { email: userDto.email },
      });
      const faculty = await this.facultiesService.getFacultyById(
        userDto.facultyId,
      );

      if (!faculty) {
        throw new HttpException('Faculty not found', HttpStatus.NOT_ACCEPTABLE);
      }

      if (existingUser) {
        throw new HttpException('User already exist', HttpStatus.UNAUTHORIZED);
      }

      const token: string = this.jwt.sign(
        { ...userDto },
        { secret: this.configService.get('secretKey') },
      );
      cookie.serialize('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60,
        path: '/',
      });

      const hashPassword: string = bcrypt.hashSync(userDto.password, 5);
      const createdUser: I_UserCreateAttrs = await Users.create({
        ...userDto,
        password: hashPassword,
        role: 'user',
      });

      const { id, email, facultyId, role } = createdUser;

      return res
        .status(201)
        .json({ user: { id, email, facultyId, role }, token });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async loginUser(res: Response, userDto: LoginUser) {
    try {
      const user = await Users.findOne({
        where: { email: userDto.email },
      });

      if (!user) {
        throw new HttpException(
          'Wrong password or email',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const unHashPassword = bcrypt.compareSync(
        userDto.password,
        user.password,
      );
      if (!unHashPassword) {
        throw new HttpException(
          'Wrong password or email',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const { id, email, facultyId, role } = user;

      const token: string = this.jwt.sign(
        { id, email, facultyId, role },
        { secret: this.configService.get('secretKey') },
      );
      cookie.serialize('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60,
        path: '/',
      });

      return res.status(200).json({ token });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async checkAuth(req: any, res: Response) {
    try {
      const token = this.jwt.sign(
        {
          id: req.user.id,
          email: req.user.email,
          facultyId: req.user.facultyId,
          role: req.user.role,
        },
        { secret: process.env.SECRET_KEY },
      );

      cookie.serialize('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60,
        path: '/',
      });

      return res.status(200).json({ message: 'Authorized' });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteUser(res: Response, id: number) {
    try {
      const existingUser = await Users.findOne({ where: { id } });

      if (!existingUser) {
        throw new HttpException('User isn`t found', HttpStatus.BAD_REQUEST);
      }

      await existingUser.destroy();

      return res.status(200).json({ message: 'Successfully' });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
