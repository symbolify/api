import { Sequelize } from 'sequelize-typescript';
import { Todo } from 'src/todo/todo.entity';

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
      sequelize.addModels([Todo]);
      await sequelize.sync();
      return sequelize;
    },
  },
];