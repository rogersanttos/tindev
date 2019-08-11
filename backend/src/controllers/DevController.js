//Controller da aplicação, responsável pela manipulação dos dados
//axios para fazer requisições
const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
    async index(req,res){
        const {user} = req.headers;

        const loggedDev = await Dev.findById(user);
        const users = await Dev.find({
            $and:[
                { _id: {$ne:user} }, //not equal
                { _id: {$nin:loggedDev.likes} }, //not in
                { _id: {$nin:loggedDev.dislikes} }, //not in
            ]
        })

        return res.json({users});
    },

    async store(req,res){
        //desetruturação
        const { username } = req.body;
        const useExists = await Dev.findOne({user:username});

        if (useExists){
            return res.json(useExists);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);
        //o axios sempre retornará o resultado na propriedade data
        const{ name, bio, avatar_url:avatar} = response.data;
        //usa o objeto da model para efetuar o 
        const dev = await Dev.create({
            name, 
            user:username,
            bio,
            avatar
        })

        return res.json(dev)
    }
};