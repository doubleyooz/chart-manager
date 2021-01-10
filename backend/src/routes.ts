import * as express from 'express';
const AssetController = require('./controllers/stock');
const UserController = require('./controllers/user');
const EnterpriseController = require('./controllers/enterprise');

import UserMiddleware from './middlewares/user';
import EnterpriseMiddleware from './middlewares/enterprise';
import AssetMiddleware from './middlewares/stock';

import response from './common/response';

const routes = express.Router()

routes.get('/', (req: express.Request, res: express.Response) => {
    return res.json(response.jsonOK(null, "Hello World", null));

});


routes.post('/stock/store', AssetMiddleware.valid_store, AssetController.store);
routes.get('/stock/index', AssetController.index);

routes.post('/user/create', UserMiddleware.valid_user, UserController.store);
routes.get('/user/index', UserController.index);

routes.post('/enterprise/create', EnterpriseMiddleware.valid_store, EnterpriseController.store);
routes.get('/enterprise/index', EnterpriseController.index);


export default routes;