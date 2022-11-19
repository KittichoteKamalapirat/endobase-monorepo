import { define } from 'typeorm-seeding';
import { Tray } from '../../resources/trays/entities/tray.entity';

define(Tray, () => {
  const tray = new Tray();
  return tray;
});
