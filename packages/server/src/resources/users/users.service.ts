import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { AppService } from '../../app.service';
import { RequestWithSession } from '../../types/context.type';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import UserResponse from './dto/user-response';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(
    data: CreateUserInput,
    req: RequestWithSession,
  ): Promise<UserResponse> {
    const errors = this.validateRegister(data);
    if (errors) {
      // if no error, return null as defined
      return { errors };
    }

    const salt = await bcrypt.genSalt(10);
    const hash = (await bcrypt.hash(data.password, salt)) as string;

    let user;
    try {
      const input = {
        username: data.username,
        password: hash,
      };
      const newUser = this.usersRepository.create(input);

      user = await this.usersRepository.save(newUser);

      return { user };
    } catch (error) {
      if (error.detail.includes('username')) {
        return {
          errors: [
            {
              field: 'username',
              message: 'username already taken',
            },
          ],
        };
      }
      if (error.detail.includes('email')) {
        return {
          errors: [
            {
              field: 'email',
              message: 'email already taken',
            },
          ],
        };
      }
      if (error.detail.includes('phonenumber')) {
        return {
          errors: [
            {
              field: 'phonenumber',
              message: 'phonenumber already taken',
            },
          ],
        };
      }
    }
    // automatically logged in after register
    // set a cookie on the user
    req.session.userId = user.id;
  }

  validateRegister = (data: CreateUserInput) => {
    if (data.username.length <= 2) {
      return [
        {
          field: 'username',
          message: 'Length must be greater than 2',
        },
      ];
    }

    if (data.username.includes('@')) {
      return [
        {
          field: 'username',
          message: 'cannot include an @',
        },
      ];
    }

    if (data.password.length <= 2) {
      return [
        {
          field: 'password',
          message: 'Length must be greater than 2',
        },
      ];
    }
    // if there is not errors, return null
    return null;
  };

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: string) {
    return this.usersRepository.findOne({ where: { id } });
  }

  findByUsername(username: string) {
    return this.usersRepository.findOne({ where: { username } });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  // for admin
  async removeAllRows() {
    try {
      const users = await this.findAll();

      await Promise.all(
        users.map((user) => this.usersRepository.delete({ id: user.id })),
      );
    } catch (error) {
      console.log('error remove users', error);
    }
  }

  async populateRows() {
    try {
      const input = {
        username: '02321',
        password:
          '$2b$10$sLE1vuo0vs6xy2oqxV/jNOjSyF83/S.PaG9dGgX5Q3lyus2/VXzqe',
      };

      const newRow = this.usersRepository.create(input);
      await this.usersRepository.save(newRow);
      return true;
    } catch (error) {
      console.log('error populating users', error);
    }
  }
}
