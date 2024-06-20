import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('RoadMap', 'root', '1234', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
})


export default sequelize;
