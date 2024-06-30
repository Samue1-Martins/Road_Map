import { RoadMap } from "../models/roadMap.models.js";
import { ERROR, SUCCESS } from "../shared/messages.js";

const createRoadMap = async (req, res) => {

    const { theme } = req.body;
    try {
        const roadMapAlreadyExist = await RoadMap.findOne({
            where: {
                theme
            }
        })

        if (roadMapAlreadyExist) {
            return res
                .status(400)
                .json({ error: `Mesmo tema ${ERROR.ALREADY_EXIST}` })
        }

        const newRoadMap = await RoadMap.create(req.body);
        res
            .status(201)
            .json(newRoadMap)

    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Erro no servidor', error })
    }
}

const getAllRoadMaps = async (req, res) => {
    const roadMap = await RoadMap.findAll();
    return res.json({ roadMap })
}

const getRoadMapByTheme = async (req, res) => {
    const { theme } = req.body;
    const roadMapFindTheme = await RoadMap.findOne({
        where: {
            theme
        }
    })
    return res.json({ roadMapFindTheme })
}

const updateTheme = async (req, res) => {
    const { id } = req.params;
    const { theme: newTheme } = req.body;

    try {
        const theme = await RoadMap.findOne({
            where: {
                id
            }
        })

        if (!theme) {
            return res
                .status(404)
                .json({ message: `Tema ${ERROR.NOT_FOUND}` })
        }
        await RoadMap.update({ theme: newTheme }, {
            where: {
                id
            }
        })

        const updateThemeRoadMap = await RoadMap.findByPk(id)
        return res.json({ message: `Tema autalizado com sucesso`, theme: updateThemeRoadMap })

    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Erro no servidor', error })
    }
};

const updateDescription = async (req, res) => {
    const { id } = req.params;
    const { description: newDescription } = req.body;

    try {
        const description = await RoadMap.findOne({
            where: {
                id
            }
        })

        if (!description) {
            return res
                .status(404)
                .json({ message: `Descrição ${ERROR.NOT_FOUND}` })
        }
        await RoadMap.update({ description: newDescription }, {
            where: {
                id
            }
        })

        const updateDescriptionRoadMap = await RoadMap.findByPk(id)
        return res.json({ message: `A descrição foi autalizada com sucesso`, theme: updateDescriptionRoadMap })

    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Erro no servidor', error })
    }
};

const updateLocal = async (req, res) => {
    const { id } = req.params;
    const { local: newLocal } = req.body;

    try {
        const local = await RoadMap.findOne({
            where: {
                id
            }
        })

        if (!local) {
            return res
                .status(404)
                .json({ message: `Local ${ERROR.NOT_FOUND}` })
        }
        await RoadMap.update({ local: newLocal }, {
            where: {
                id
            }
        })

        const updateLocalRoadMap = await RoadMap.findByPk(id)
        return res.json({ message: `Local autalizado com sucesso`, local: updateLocalRoadMap })

    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Erro no servidor', error })
    }
};

const updateSocialNetwork = async (req, res) => {
    const { id } = req.params;
    const { social_network: newSocialNetwork } = req.body;

    try {
        const socialNetwork = await RoadMap.findOne({
            where: {
                id
            }
        })

        if (!socialNetwork) {
            return res
                .status(404)
                .json({ message: `Rede social ${ERROR.NOT_FOUND}` })
        }
        await RoadMap.update({ social_network: newSocialNetwork }, {
            where: {
                id
            }
        })

        const updateSocialNetworkRoadMap = await RoadMap.findByPk(id)
        return res.json({ message: `Rede social autalizada com sucesso`, social_network: updateSocialNetworkRoadMap })

    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Erro no servidor', error })
    }
};


const deleteRoadMap = async (req, res) => {
    const { id } = req.params;
    const roadMap = await RoadMap.findOne({
        where: {
            id
        }
    })
    if (!roadMap) {
        return res
            .status(404)
            .json({ message: `Roteiro ${ERROR.NOT_FOUND}` })
    }
    await RoadMap.destroy({
        where: {
            id
        }
    })
    return res.json({ message: `Roteiro ${SUCCESS.DELETED}` })
}

export { createRoadMap, getAllRoadMaps, getRoadMapByTheme, updateTheme, updateDescription, updateLocal, updateSocialNetwork, deleteRoadMap }