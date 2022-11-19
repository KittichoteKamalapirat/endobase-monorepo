import { define } from 'typeorm-seeding';
import { User } from '../../resources/users/entities/user.entity';

define(User, () => {
  const user = new User();
  const hash = '$2b$10$sLE1vuo0vs6xy2oqxV/jNOjSyF83/S.PaG9dGgX5Q3lyus2/VXzqe';
  user.username = '02321';
  user.password = hash;
  return user;
});
