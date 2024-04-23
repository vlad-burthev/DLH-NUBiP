import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateFacultyDto } from './dto/faculty.dto';
import { FacultiesService } from './faculties.service';
import { Faculties } from './model/faculties.model';

@ApiTags('Факультет')
@Controller('faculties')
export class FacultiesController {
  constructor(private readonly facultiesService: FacultiesService) {}

  @Get('get-all')
  @ApiOperation({ summary: 'Отримати всі факультети' })
  @ApiResponse({ status: 200, type: Faculties })
  getAllFaculties(@Res() res: Response) {
    return this.facultiesService.getAllFaculties(res);
  }

  @Get('get-one')
  @ApiOperation({ summary: 'Отримати факультет по Id' })
  @ApiResponse({ status: 200, type: Faculties })
  getFacultyById(@Body('id') id: number) {
    return this.facultiesService.getFacultyById(id);
  }

  @Post('create')
  @ApiOperation({ summary: 'Створення нового факультету' })
  @ApiResponse({ status: 200, type: Faculties })
  createFaculty(@Res() res: Response, @Body() facultyDto: CreateFacultyDto) {
    return this.facultiesService.createNewFacylty(res, facultyDto);
  }

  @Post('delete/:id')
  @ApiOperation({ summary: 'Видалення факультету' })
  @ApiResponse({ status: 200, type: Faculties })
  deleteFacultyById(@Res() res: Response, @Param('id') id: number) {
    return this.facultiesService.deleteFaculty(res, id);
  }

  @Post('modify/:id')
  @ApiOperation({ summary: 'Змінення факультету' })
  @ApiResponse({ status: 200, type: Faculties })
  updateFacultyById(
    @Res() res: Response,
    @Param('id') id: number,
    @Body('newName') newName: CreateFacultyDto,
  ) {
    return this.facultiesService.changeFaculty(res, id, newName);
  }
}
