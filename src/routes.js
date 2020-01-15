const {Router} = require ('express');
const DevController = require ('./controllers/devController');
const SearchController = require ('./controllers/SearchController');

const routes = Router();

routes.post('/devs', DevController.store);
routes.get('/devs', DevController.index);
routes.delete('/devs/:id', DevController.destroy);
routes.update('/devs', DevController.update);

routes.get('/search', SearchController.index);

module.exports = routes;