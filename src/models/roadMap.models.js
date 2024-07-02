import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import Sequelize from "sequelize";

export const RoadMap = sequelize.define("tb_road_map", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    theme: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    local: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    social_network: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
    },
});