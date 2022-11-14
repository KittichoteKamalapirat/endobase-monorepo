import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from '../users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    console.log('passport');
    super(); // config
  }

  async validate(username: string, password: string): Promise<User> {
    console.log('validate was called?');
    const { user } = await this.authService.validateUser(username, password);

    console.log('user', user);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
