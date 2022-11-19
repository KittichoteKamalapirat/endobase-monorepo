import { define } from 'typeorm-seeding';
import { Endo } from '../../resources/endos/entities/endo.entity';

define(Endo, () => {
  const endo = new Endo();
  return endo;
});
