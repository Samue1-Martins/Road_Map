import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import Sequelize from "sequelize";

export const Video = sequelize.define("tb_video", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false
    },
    format: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: { 
        type: DataTypes.ENUM('pendente', 'em_andamento', 'concluido', 'cancelado'), 
        allowNull: false,
        defaultValue: 'pendente'
    },
    video_url: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    roadMapId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'tb_road_map', key: 'id' },
        onDelete: 'CASCADE' 
    }
});