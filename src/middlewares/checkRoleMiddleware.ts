import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CheckRoleMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: any, res: Response, next: NextFunction) {
    const token = req.cookies.token;
    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }

    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.SECRET_KEY,
      });
      const decodedRole: string = decoded.role;

      if (decodedRole !== 'admin') {
        throw new UnauthorizedException('Not enough rights');
      }

      req.user = {
        id: decoded.id,
        email: decoded.email,
        facultyId: decoded.facultyId,
        role: decoded.role,
      };

      next();
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
