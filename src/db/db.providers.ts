import { Sequelize } from 'sequelize-typescript';
import { Todo } from '../todo/todo.entity';
import { User } from '../user/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'db',
        port: 5432,
        username: 'postgres',
        password: 'example',
        database: 'template1',
      });
      sequelize.addModels([Todo, User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];