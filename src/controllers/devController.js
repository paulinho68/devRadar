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

    async update(request, response) {

        // const { id, github_username,techs, latitude, longitude,bio, name, avatar_url} = request.body;
        
        
        let dev = await Dev.findById(request.params.id);
        
        if(dev){
            console.log('testeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
            // const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const location = {
                type: 'Point',
                coordinates: [request.body.longitude,request.body.latitude],
            };
        
            const dev = await Dev.update ({
                id : request.body.id,
                github_username : request.body.github_username,
                name : request.body.name,
                avatar_url : request.body.avatar_url,
                bio : request.body.bio,
                techs: parseStringAsArray(request.body.techs),
                location: location,
            });
        }else{
            dev = ({
                "message": "usuário não existe"
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