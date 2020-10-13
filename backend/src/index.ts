require('dotenv').config()
import * as express from 'express';
import * as bodyParser from 'body-parser';

import * as mongoose from 'mongoose';

import routes from './routes';

mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-c09yq.mongodb.net/ChartManager?retryWrites=true&w=majority`, {
useNewUrlParser: true,
useUnifiedTopology: true
});

const app: express.Application = express();

const server = require('http').Server(app);

app.use(bodyParser.json());
app.use(routes);


server.listen(3333);