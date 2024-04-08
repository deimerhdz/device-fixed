import * as bcryptjs from 'bcryptjs';
import { User } from '../../user/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';


export default setSeederFactory(User, async (faker) => {
  const user = new User();
  user.name = faker.internet.userName(user.name,);
  user.username = faker.internet.userName(user.username);
  user.password = await bcryptjs.hash(faker.internet.password(), 10);

  return user;
});