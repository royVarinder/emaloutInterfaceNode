const emChannel = require("../../models").em_channel;
const { apiResponse } = require("../../util");
module.exports = {
    getAllChannels: async (req, res) => {
        try {
            const channels = await emChannel.findAll({ where: { status: 1 } });
            return res.status(200).json(apiResponse(true, "Channels fetched successfully", channels));
        } catch (error) {
            console.error(error);
            return res.status(500).json(apiResponse(false, error.message, []));
        }
    }
}
