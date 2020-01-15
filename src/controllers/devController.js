const axios = require('axios'); 
const Dev = require ('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {

    async index(request,response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {

        const { github_username,techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({github_username});

        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        
            const{ name = login, avatar_url, bio} = apiResponse.data;

            const location = {
                type: 'Point',
                coordinates: [longitude,latitude],
            };
        
            const dev = await Dev.create ({
                github_username,
                name,
                avatar_url,
                bio,
                techs: parseStringAsArray(techs),
                location,
            });
        }
        return response.json(dev);
    },

    async destroy(request, response) {

        let dev = await Dev.findById(request.params.id);

        if(dev){
            const dev = await Dev.findByIdAndRemove(request.params.id)

        }else{
            dev = ({
                "message": "usuário não existe"
            });
        }
        return response.json(dev);
    }
}