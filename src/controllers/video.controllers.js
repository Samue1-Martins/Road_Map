import { Video } from "../models/video.models.js";
import { ERROR, SUCCESS } from "../shared/messages.js";

const createVideo = async (req, res) => {

    const { title } = req.body;
    try {
        const videoAlreadyExist = await Video.findOne({
            where: {
                title
            }
        })

        if (videoAlreadyExist) {
            return res
                .status(400)
                .json({ error: `Mesmo video ${ERROR.ALREADY_EXIST}` })
        }

        const newVideo = await Video.create(req.body);
        res
            .status(201)
            .json(newVideo)

    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Erro no servidor', error })
    }
}

const getAllVideos = async (req, res) => {
    const videos = await Video.findAll();
    return res.json({ videos })
}

const getVideoByTitle = async (req, res) => {
    try{
        const { title } = req.body;
        const findVideoTitle = await Video.findOne({
            where: {
                title
            }
        })
        if(!findVideoTitle){
            return res
                .status(400)
                .json({ error: `Vídeo ${ERROR.NOT_FOUND}` })
        }

        await res.json({ findVideoTitle })
    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Erro no servidor', error })
    }

}

const updateTitle = async (req, res) => {
    const { id } = req.params;
    const { title: newTitle } = req.body;

    try {
        const title = await Video.findOne({
            where: {
                id
            }
        })

        if (!title) {
            return res
                .status(404)
                .json({ message: `Vídeo ${ERROR.NOT_FOUND}` })
        }
        await Video.update({ title: newTitle }, {
            where: {
                id
            }
        })

        const updateTitleVideo = await Video.findByPk(id)
        return res.json({ message: `Titulo autalizado com sucesso`, title: updateTitleVideo })

    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Erro no servidor', error })
    }
};

const updateDurationVideo = async (req, res) => {
    const { id } = req.params;
    const { duration: newDuration } = req.body;

    try {
        const duration = await Video.findOne({
            where: {
                id
            }
        })

        if (!duration) {
            return res
                .status(404)
                .json({ message: `Vídeo ${ERROR.NOT_FOUND}` })
        }
        await Video.update({ duration: newDuration }, {
            where: {
                id
            }
        })

        const updateDurationVideo = await Video.findByPk(id)
        return res.json({ message: `Duração do vídeo autalizada com sucesso`, duaration: updateDurationVideo })

    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Erro no servidor', error })
    }
};

const updateTypeArchive = async (req, res) => {
    const { id } = req.params;
    const { typeArchive: newTypeArchive } = req.body;

    try {
        const typeArchive = await Video.findOne({
            where: {
                id
            }
        })

        if (!typeArchive) {
            return res
                .status(404)
                .json({ message: `Vídeo ${ERROR.NOT_FOUND}` })
        }
        await Video.update({ typeArchive: newTypeArchive }, {
            where: {
                id
            }
        })

        const updatetypeArchiveVideo = await Video.findByPk(id)
        return res.json({ message: `Tipo de arquivo autalizado com sucesso`, typeArchive: updatetypeArchiveVideo })

    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Erro no servidor', error })
    }
};

const deleteVideo = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findOne({
        where: {
            id
        }
    })
    if (!video) {
        return res
            .status(404)
            .json({ message: `Vídeo ${ERROR.NOT_FOUND}` })
    }
    await Video.destroy({
        where: {
            id
        }
    })
    return res.json({ message: `Vídeo ${SUCCESS.DELETED}` })
}

export { createVideo, getAllVideos, getVideoByTitle, updateDurationVideo, updateTitle, updateTypeArchive, deleteVideo }