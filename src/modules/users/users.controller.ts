import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUser } from './dto/create-user.dto';
import { Request, Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Users } from './model/users.model';

@ApiTags('Користувачі')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('registration')
  @ApiOperation({ summary: 'Реєстрація' })
  @ApiResponse({ status: 200, type: Users })
  registration(@Res() res: Response, @Body() userDto: CreateUserDto) {
    return this.usersService.createUser(res, userDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Авторизація' })
  @ApiResponse({ status: 200, type: Users })
  login(@Res() res: Response, @Body() userDto: LoginUser) {
    return this.usersService.loginUser(res, userDto);
  }

  @Get('check-auth')
  @ApiOperation({ summary: 'Перевірка користувача' })
  @ApiResponse({ status: 200 })
  checkAuth(@Req() req: Request, @Res() res: Response) {
    return this.usersService.checkAuth(req, res);
  }

  @Post('delete/:id')
  @ApiOperation({ summary: 'Видалення користувача' })
  @ApiResponse({ status: 200 })
  deleteUser(@Res() res: Response, @Param('id') id: number) {
    return this.usersService.deleteUser(res, id);
  }
}
