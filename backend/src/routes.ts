import * as express from 'express';
const StockController = require('./controllers/stock');
const UserController = require('./controllers/user');
const EnterpriseController = require('./controllers/enterprise');

import UserMiddleware from './middlewares/user';
import EnterpriseMiddleware from './middlewares/enterprise';
import StockMiddleware from './middlewares/stock';
import JwtMiddleware from './middlewares/jwt';


const routes = express.Router()

routes.get('/', (req: express.Request, res: express.Response) => {
    return res.jsonOK(null, "Hello World", null);

});


routes.post('/stock/store', StockMiddleware.valid_store, StockController.store);
routes.get('/stock/index', StockController.index);

routes.post('/user/create', UserMiddleware.valid_sign_up, UserController.store);
routes.get('/user/index', UserController.index);
routes.delete('/user/delete', JwtMiddleware.checkJwt, UserController.delete);
routes.post('/sign-in', UserMiddleware.valid_sign_in, UserController.auth);

routes.post('/enterprise/create', EnterpriseMiddleware.valid_store, EnterpriseController.store);
routes.get('/enterprise/index', EnterpriseController.index);


export default routes;