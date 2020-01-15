const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response){
        //buscar todos os devs em um raio de 10km
        //filtrar por tecnologias
        const { latitude, longitude, techs } = request.query;

        const devs = await Dev.find({
            techs: {
                $in: parseStringAsArray(techs),
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 1000000,
                },
            },
        })
        parseStringAsArray(techs)
        console.log(techs);

        return response.json({ devs});
    }
}