import * as httpStatus from 'http-status-codes';

import { Controller } from '../types/controller';
import { ErrorModel } from '../models';

const notFoundHandler: Controller = (req, res) => {
  res.json(new ErrorModel(httpStatus.NOT_FOUND, httpStatus.getStatusText(httpStatus.NOT_FOUND)));
};

export default notFoundHandler;
