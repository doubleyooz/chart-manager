import * as express from 'express';
const AssetController = require('./controllers/asset');
const UserController = require('./controllers/user');
const EnterpriseController = require('./controllers/enterprise');

const routes = express.Router()

routes.get('/', (req: express.Request, res: express.Response) => {
    return res.json({ message: "Hello World"});

});


routes.post('/asset/create', AssetController.store);
routes.post('/asset/index', AssetController.index);

routes.post('/user/create', UserController.store);
routes.get('/user/index', UserController.index);

routes.post('/enterprise/create', EnterpriseController.store);
routes.get('/enterprise/index', EnterpriseController.index);


export default routes;