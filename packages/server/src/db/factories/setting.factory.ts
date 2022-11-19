import { define } from 'typeorm-seeding';
import { Setting } from '../../setting/entities/setting.entity';

define(Setting, () => {
  const setting = new Setting();
  return setting;
});
