import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { RouteHistoryService } from './route-history.service';
import { CreateRouteHistoryDto } from './dto/route-history.dto';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RouteHistory } from './model/route-history.model';

@ApiTags('Історія маршрутів')
@Controller('route-history')
export class RouteHistoryController {
  constructor(private readonly routeHistoryService: RouteHistoryService) {}

  @Post('add')
  @ApiOperation({ summary: 'Додавання маршруту в історію' })
  @ApiResponse({ status: 200, description: 'Successfully' })
  CreateRouteHistory(
    @Res() res: Response,
    @Body() route: CreateRouteHistoryDto,
  ) {
    return this.routeHistoryService.createRouteHistory(res, route);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Оновлення дати маршруту' })
  @ApiResponse({ status: 200, description: 'Successfully' })
  updateRouteHistoryById(@Res() res: Response, @Param('id') id: number) {
    return this.routeHistoryService.updateRouteHistory(res, id);
  }

  @Post('delete/:id')
  @ApiOperation({ summary: 'Видалення маршруту з історії' })
  @ApiResponse({ status: 200, description: 'Successfully' })
  deleteRouteHistoryById(@Res() res: Response, @Param('id') id: number) {
    return this.routeHistoryService.deleteRouteHistory(res, id);
  }

  @Post('delete-all/:userId')
  @ApiOperation({ summary: 'Видалення всіх маршрутів з історії' })
  @ApiResponse({ status: 200, description: 'Successfully' })
  deleteAllRouteHistoryById(
    @Res() res: Response,
    @Param('userId') userId: number,
  ) {
    return this.routeHistoryService.deleteAllRoutes(res, userId);
  }

  @Get('get-all/:userId')
  @ApiOperation({ summary: 'Отримання історії маршрутів' })
  @ApiResponse({
    status: 200,
    type: RouteHistory,
    description: 'Список маршрутів',
  })
  getAllRouteHistory(@Res() res: Response, @Param('userId') userId: number) {
    return this.routeHistoryService.getAllRouteHistory(res, userId);
  }
}
