import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserPointDto } from './dto/user-points.dto';
import { UserPoints } from './model/user-points.model';

@Injectable()
export class UserPointsService {
  async createUserPoint(res: Response, point: CreateUserPointDto) {
    try {
      const existingPoint = await UserPoints.findOne({
        where: { title: point.title },
      });

      if (existingPoint) {
        throw new HttpException('Point already exist', HttpStatus.BAD_REQUEST);
      }

      await UserPoints.create(point);

      return res.status(200).json({ message: 'successfully' });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteUserPoint(res: Response, id: number) {
    try {
      const existingPoint = await UserPoints.findOne({
        where: { id },
      });

      if (!existingPoint) {
        throw new HttpException('Point doesn`t exist', HttpStatus.BAD_REQUEST);
      }

      await existingPoint.destroy();

      return res.status(200).json({ message: 'successfully' });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllUserPoint(res: Response, userId: number) {
    try {
      const existingPoints = await UserPoints.findAll({
        where: { userId },
      });

      return res.status(200).json(existingPoints);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
