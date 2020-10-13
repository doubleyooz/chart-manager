import * as express from 'express';
const AssetController = require('./controllers/asset');



const routes = express.Router()

routes.get('/', (req: express.Request, res: express.Response) => {
    return res.json({ message: "Hello World"});

});


routes.post('/asset', AssetController.store);



export default routes;