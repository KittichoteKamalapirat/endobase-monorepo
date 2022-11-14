import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: User, done: (err: Error, user: User) => void): any {
    done(null, user);
  }

  deserializeUser(payload: any, done: (err: Error, user: User) => void): any {
    // TODO
    done(null, payload);
  }
}
