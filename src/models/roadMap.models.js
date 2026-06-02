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
    social_network: {
        type: DataTypes.ENUM('YouTube', 'Instagram', 'TikTok', 'Outros'),
        allowNull: false,
        defaultValue: 'YouTube'
    },
    status: {
        type: DataTypes.ENUM('rascunho', 'ativo', 'arquivado'),
        allowNull: false,
        defaultValue: 'rascunho'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'tb_users', key: 'id' }
    }
});