import { Video } from "../models/video.models.js";
import { User } from "../models/user.models.js";
import { RoadMap } from "../models/roadMap.models.js";

User.hasMany(RoadMap, { foreignKey: 'userId', as: 'roadmaps'});
RoadMap.belongsTo(User, {foreignKey: 'userId', as: 'author'});

RoadMap.hasMany(Video, {foreignKey: 'roadMapId', as: 'videos'});
Video.belongsTo(RoadMap, {foreignKey: 'roadMapId', as: 'roadmap'});

export {User, RoadMap, Video};