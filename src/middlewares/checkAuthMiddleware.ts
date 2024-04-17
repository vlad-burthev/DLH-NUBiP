import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';

@Injectable()
export class CheckAuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: any, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.token;

      if (!token) {
        throw new UnauthorizedException('Unauthorized');
      }

      const decodedToken = this.jwtService.verify(token, {
        secret: process.env.SECRET_KEY,
      });

      if (!decodedToken || typeof decodedToken !== 'object') {
        throw new UnauthorizedException('Invalid token');
      }

      req.user = decodedToken;

      next();
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
