import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { COOKIE_NAME, IS_PROD } from '../../constants';
import { MyContext, RequestWithSession } from '../../types/context.type';
import UserResponse from '../users/dto/user-response';
import { UsersService } from '../users/users.service';
import { LoginInput } from './dto/login.input';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) { }

  async login(data: LoginInput, req: RequestWithSession) {
    const response = await this.validateUser(data.username, data.password);
    if (response.user) {
      req.session.userId = response.user.id;
      return { user: response.user };
    } else {
      return { errors: response.errors };
    }
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserResponse> {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      return {
        errors: [
          {
            field: 'username',
            message: 'The username does not exist',
          },
        ],
      };
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'Incorrect password',
          },
        ],
      };
    }

    return { user };
  }

  async logout({ req, res }: MyContext) {
    return new Promise((resolve) => {
      // remove the session in redis`
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME, {
          httpOnly: true,
          sameSite: 'lax',
          secure: IS_PROD,
        });
        if (err) {
          // console.log(err);
          resolve(false);
          return;
        }
        resolve(true); // logged out
      });
    });
  }
}
