import { RoadMap } from "../models/roadMap.models.js";
import { ERROR, SUCCESS } from "../shared/messages.js";

export const createRoadMap = async (req, res) => {
    try {
        const { theme, description, social_network, status } = req.body;

        console.log(req.body)
        const authorId = req.userId;

        const newRoadMap = await RoadMap.create({
            theme,
            description,
            social_network,
            status,
            userId: authorId
        });

        return res.status(201).json(newRoadMap);

    } catch (error) {
        console.error('[ERRO] createRoadMap:', error)
        return res.status(500).json({ message: 'Erro interno no servidor' });
    };
};

export const getRoadMaps = async (req, res) => {
    try {
        const { theme } = req.query;
        const whereClause = theme ? { theme } : {};

        const roadMaps = await RoadMap.findAll({ where: whereClause });
        return res.status(200).json(roadMaps)

    } catch (error) {
        console.log('ERRO getRoadMaps:', error);
        return res.status(500).json({ message: 'Erro interno no servidor' });
    }
};

export const updateRoadMap = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const roadMap = await RoadMap.findByPk(id);

        if (!roadMap) {
            return res.status(404).json({ message: `Roteiro ${ERROR.NOT_FOUND}` })
        }

        await roadMap.update(updateData);

        return res.status(200).json({
            message: 'Roteiro atualizado com sucesso',
            roadMap
        })
    } catch (error) {
        console.error('[ERRO] updateRoadMap:', error);
        return res.status(500).json({ message: 'Erro interno no servidor' });
    };
};

export const deleteRoadMap = async (req, res) => {
    try {
        const { id } = req.params;
        const roadMap = await RoadMap.findByPk(id);

        if (!roadMap) {
            return res.status(404).json({ message: `Roteiro ${ERROR.NOT_FOUND}` })
        }

        await roadMap.destroy();
        return res.status(200).json({ message: `Roteiro ${SUCCESS.DELETED}` })

    } catch (error) {
        console.error('[ERRO] deletedRoadMap', error)
        return res.status(500).json({ message: 'Erro interno no servidor' });
    }
}