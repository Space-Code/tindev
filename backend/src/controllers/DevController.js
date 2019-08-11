/**
 * 
 * @author Rodrigo Santos de Souza
 */

const axios = require("axios");
const Dev = require("../models/Dev");

module.exports = {
    async store(req, res) {

        try {            
            const { username } = req.body;

            const userExist = await Dev.findOne({user: username});
    
            if (userExist)
                return res.json({data: userExist});
    
            const response = await axios.get(`https://api.github.com/users/${username}`);
    
            const { name, bio, avatar_url: avatar } = response.data 
    
            const dev = await Dev.create({
                name, 
                user: username, 
                bio, 
                avatar
            });
            
            return res.json({data: dev});
        } catch (error) {
            return res.status(500).json({ 
                messagem: 'Erro interno no sistema.',
                error: error
            });
        }
    },

    async index(req, res) {
        try {
            const { user } = req.headers;

            const loggedDev = await Dev.findById(user);

            const users = await Dev.find({
                $and: [
                    { _id: { $ne: user } },
                    { _id: { $nin: loggedDev.likes } },
                    { _id: { $nin: loggedDev.dislikes } },
                ],
            });

            return res.json({users});
        } catch (error) {
            return res.status(500).json({ 
                messagem: 'Erro interno no sistema.',
                error: error
            });
        }
        
    }
}