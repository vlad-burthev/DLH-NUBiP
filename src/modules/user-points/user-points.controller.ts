import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UserPointsService } from './user-points.service';
import { Response } from 'express';
import { CreateUserPointDto } from './dto/user-points.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserPoints } from './model/user-points.model';

@ApiTags('Точки користувачів')
@Controller('user-points')
export class UserPointsController {
  constructor(private readonly userPointsService: UserPointsService) {}

  @ApiOperation({ summary: 'Створення точки користувчачем' })
  @ApiResponse({ status: 200, type: UserPoints })
  @Post('create')
  createUserPoint(@Res() res: Response, @Body() point: CreateUserPointDto) {
    return this.userPointsService.createUserPoint(res, point);
  }

  @ApiOperation({ summary: 'Створення точки користувчачем' })
  @ApiResponse({ status: 200, type: UserPoints })
  @Post('delete/:id')
  deleteUserPointById(@Res() res: Response, @Param('id') id: number) {
    return this.userPointsService.deleteUserPoint(res, id);
  }

  @Get('get-all/:userId')
  getAllUserPointById(@Res() res: Response, @Param('userId') userId: number) {
    return this.userPointsService.getAllUserPoint(res, userId);
  }
}
