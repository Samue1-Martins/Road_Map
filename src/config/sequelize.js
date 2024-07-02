import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('roadmap', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false
});

export default sequelize 