
import * as passport from 'passport';
import * as _ from 'lodash';

import { authHelper } from '../db/helpers';
import { Controller } from '../types';
import { Response } from '../models';

export const registerUser: Controller = async(req, res, next) => {
  try {
    const { body } = req;
    const createdUser = await authHelper.create(body);

    createdUser.password = undefined;

    res.json(new Response({
      token: createdUser.generateJWT(),
      ...createdUser.toJSON(),
    }));
  } catch (error) {
    next(error);
  }
};

export const loginUser: Controller = async(req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    try {
      if (!_.isEmpty(err) || _.isEmpty(user)) {
        throw err;
      }

      user.password = undefined;

      return res.json(new Response({
        token: user.generateJWT(),
        ...user.toJSON(),
      }));
    } catch (error) {
      next(error);
    }
  })(req, res, next);
};
