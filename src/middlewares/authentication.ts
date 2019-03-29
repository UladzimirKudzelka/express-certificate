import * as passport from 'passport';
import * as _ from 'lodash';
import * as httpStatus from 'http-status-codes';

import { Controller } from '../types';
import { ErrorMessageEnum, RoleEnum } from '../enums';
import { ErrorModel } from '../models';

export const authenticate: Controller = (req, res, next) => {
  passport.authenticate('jwt', (err, user) => {
    try {
      if (_.isEmpty(user) || !_.isEmpty(err)) {
        throw new ErrorModel(httpStatus.UNAUTHORIZED, ErrorMessageEnum.Unauthorized);
      }

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  })(req, res, next);
};

export const verifyAdminRole: Controller = (req, res, next) => {
  try {
    if (!!req.user && req.user.role === RoleEnum.Admin) {
      next();
    }

    throw new ErrorModel(httpStatus.FORBIDDEN, ErrorMessageEnum.NoAdminPermissions);
  } catch (error) {
    next(error);
  }
};
