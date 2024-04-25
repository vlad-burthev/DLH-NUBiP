import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RouteHistory } from './model/route-history.model';
import { CreateRouteHistoryDto } from './dto/route-history.dto';
import { Response } from 'express';

@Injectable()
export class RouteHistoryService {
  async createRouteHistory(res: Response, route: CreateRouteHistoryDto) {
    try {
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      await RouteHistory.create({
        ...route,
        date: `${day}.${month + 1}.${year}`,
      });
      return res.status(200).json({ message: 'successfully' });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateRouteHistory(res: Response, id: number) {
    try {
      const existingRoute = await RouteHistory.findOne({ where: { id } });

      if (!existingRoute) {
        throw new HttpException('Route doesn`t exist', HttpStatus.BAD_REQUEST);
      }

      const date = new Date();

      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();

      existingRoute.update({ date: `${day}.${month + 1}.${year}` });

      return res.status(200).json({ message: 'successfully' });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteRouteHistory(res: Response, id: number) {
    try {
      const existingRoute = await RouteHistory.findOne({ where: { id } });

      if (!existingRoute) {
        throw new HttpException('Route doesn`t exist', HttpStatus.BAD_REQUEST);
      }

      await existingRoute.destroy();

      return res.status(200).json({ message: 'successfully' });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteAllRoutes(res: Response, userId: number) {
    try {
      const routes = await RouteHistory.findAll({ where: { userId } });
      if (!routes) {
        throw new HttpException('Routes doesn`t exist', HttpStatus.BAD_REQUEST);
      }
      for (const route of routes) {
        await route.destroy();
      }
      return res.status(200).json({ message: 'successfully' });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllRouteHistory(res: Response, userId: number) {
    try {
      const routes = await RouteHistory.findAll({ where: { userId } });
      return res.status(200).json(routes);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
