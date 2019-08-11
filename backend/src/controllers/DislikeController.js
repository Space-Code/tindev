/**
 * 
 * @author Rodrigo Santos de Souza
 */

const Dev = require("../models/Dev");

module.exports = {
    async store(req, res) {
        
        try {            
            const { devId } = req.params;
            const { user } = req.headers;

            const loggedDev = await Dev.findById(user);
            const targetDev = await Dev.findById(devId);

            if( !targetDev )
                return res.status(400).json({ error: "Dev not exists" });

            if (targetDev.dislikes.includes(loggedDev._id))
                return res.json({ loggedDev, message: "Deu Dislike" });

            loggedDev.dislikes.push(targetDev._id);
            await loggedDev.save();
            return res.json({ loggedDev });

        } catch (error) {
            return res.status(500).json({ 
                messagem: 'Erro interno no sistema.',
                error: error,
                devId: req.params.devId,
                user: req.headers.user
            });
        }
    }
};