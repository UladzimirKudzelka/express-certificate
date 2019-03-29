import { Controller } from '../types/controller';

const logger: Controller = (req, res, next) => {
  console.log(`${req.method.toUpperCase()}: ${req.url}`);
  next();
};

export default logger;
