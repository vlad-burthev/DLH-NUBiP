import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Faculties } from './model/faculties.model';
import { Response } from 'express';
import { CreateFacultyDto } from './dto/faculty.dto';

@Injectable()
export class FacultiesService {
  async getAllFaculties(res: Response) {
    try {
      const faculties = await Faculties.findAll();
      return res.status(200).json(faculties);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getFacultyById(id: number) {
    try {
      const faculty = await Faculties.findOne({ where: { id } });
      return faculty;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createNewFacylty(res: Response, facultyDto: CreateFacultyDto) {
    try {
      const existingFaculty = await Faculties.findOne({
        where: { name: facultyDto.name },
      });

      if (existingFaculty) {
        throw new HttpException(
          'Faculty already exist',
          HttpStatus.BAD_REQUEST,
        );
      }

      await Faculties.create({
        name: facultyDto.name,
      });

      return res.status(200).json({ message: 'Saccessfully' });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteFaculty(res: Response, id: number) {
    try {
      const existingFaculty = await Faculties.findOne({ where: { id } });

      if (!existingFaculty) {
        throw new HttpException('Faculty dosn`t exist', HttpStatus.BAD_REQUEST);
      }

      await existingFaculty.destroy();

      return res.status(200).json({ message: 'Saccessfully' });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async changeFaculty(res: Response, id: number, newName: CreateFacultyDto) {
    try {
      const existingFaculty = await Faculties.findOne({ where: { id } });

      if (!existingFaculty) {
        throw new HttpException('Faculty dosn`t exist', HttpStatus.BAD_REQUEST);
      }

      await existingFaculty.update({ name: newName.name });
      return res.status(200).json({ message: 'Saccessfully' });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
