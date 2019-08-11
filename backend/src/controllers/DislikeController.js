const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        const { devId } = req.params;
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        //Se ainda não deu like, inclui
        if (!loggedDev.likes.includes(devId)) {
            loggedDev.dislikes.push(targetDev._id);
            await loggedDev.save();
        }

        if (!targetDev) {
            return res.status(400).json({ error: 'Dev not exists' });
        }

        return res.json({ loggedDev });
    }
};