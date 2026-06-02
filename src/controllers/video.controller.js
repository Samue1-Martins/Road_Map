import { Video } from "../models/video.models.js";
import { ERROR, SUCCESS } from "../shared/messages.js";

export const createVideo = async (req, res) => {
    try {
        const { title } = req.body;

        const newVideo = await Video.create(req.body);
        return res.status(201).json(newVideo);

    } catch (error) {
        console.log('[ERRO] createVideo:', error)
        return res.status(500).json({ message: 'Erro interno no servidor' });
    };
};

export const getVideos = async (req, res) => {
    try {
        const { title } = req.query;
        const whereClause = title ? { title } : {};

        const videos = await Video.findAll({ where: whereClause });
        return res.status(200).json(videos)

    } catch (error) {
        console.log('ERRO getAllVideos:', error);
        return res.status(500).json({ message: 'Erro interno no servidor' });
    }
};

export const updateVideo = async (req, res) => {
    try {
        const { id } = req.params;

        const updateData = req.body;

        const videos = await Video.findByPk(id);

        if (!videos) {
            return res.status(404).json({ message: `Vídeo ${ERROR.NOT_FOUND}` });
        };

        await videos.update(updateData);

        return res.status(200).json({
            message: 'Vídeo autalizado com sucesso',
            updateData
        });

    } catch (error) {
        return res.status(500).json({ message: 'Erro no servidor', error });
    };
};

export const deleteVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const video = await Video.findByPk(id);

        if (!video) {
            return res.status(404).json({ message: `Vídeo ${ERROR.NOT_FOUND}` })
        };

        await video.destroy();
        return res.json({ message: `Vídeo ${SUCCESS.DELETED}` });

    } catch (error) {
        console.error('[ERRO] deletedRoadMap', error)
        return res.status(500).json({message: 'Erro interno no servidor' })
    }
};
