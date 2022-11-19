import { define } from 'typeorm-seeding';
import { Container } from '../../resources/containers/entities/container.entity';

define(Container, () => {
  const container = new Container();
  return container;
});
