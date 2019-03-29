import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import errorHandler from './error';
import logger from './logger';
import mainRouter from '../routes';
import notFoundHandler from './not-found';

export default app => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(logger);
  app.use('/api', mainRouter);
  app.all('*', notFoundHandler);
  app.use(errorHandler);
};
