import * as express from 'express';
import * as env from 'dotenv';

import './src/passport';
import middlewares from './src/middlewares';

const app = express();

env.config();

middlewares(app);

export default app;
