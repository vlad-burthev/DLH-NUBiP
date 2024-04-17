import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { CreateFacultyDto } from './dto/faculty.dto';
import { FacultiesService } from './faculties.service';

@ApiTags('Факультет')
@Controller('faculties')
export class FacultiesController {
  constructor(private readonly facultiesService: FacultiesService) {}

  @Get('all-faculties')
  getAllFaculties(@Res() res: Response) {
    return this.facultiesService.getAllFaculties(res);
  }

  @Get('faculty-by-id')
  getFacultyById(@Body('id') id: number) {
    return this.facultiesService.getFacultyById(id);
  }

  @Post('add-faculty')
  createFaculty(@Res() res: Response, @Body() facultyDto: CreateFacultyDto) {
    return this.facultiesService.createNewFacylty(res, facultyDto);
  }

  @Post('delete-faculty/:id')
  deleteFacultyById(@Res() res: Response, @Param('id') id: number) {
    return this.facultiesService.deleteFaculty(res, id);
  }

  @Post('update-faculty/:id')
  updateFacultyById(
    @Res() res: Response,
    @Param('id') id: number,
    @Body('newName') newName: CreateFacultyDto,
  ) {
    return this.facultiesService.changeFaculty(res, id, newName);
  }
}
