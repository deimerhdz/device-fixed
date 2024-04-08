import * as bcryptjs from 'bcryptjs';
import { User } from '../../user/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(User);

    const data = {
      name: 'admin',
      username: 'admin123',
      password: await bcryptjs.hash('admin', 10),
      role: 'ADMIN'
    };

    const user = await repository.findOneBy({ username: data.username });

    // Insert only one record with this username.
    if (!user) {
      await repository.insert([data]);
    }
  }
}