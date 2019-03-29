import * as passport from 'passport';
import * as LocalStrategy from 'passport-local';
import * as passportJWT from 'passport-jwt';
import * as config from 'config';
import * as _ from 'lodash';
import * as httpStatus from 'http-status-codes';

import { authHelper } from '../db/helpers';
import { ErrorModel } from '../models';
import { ErrorMessageEnum } from '../enums';
import { User } from '../db/schemas';

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

passport.use(new LocalStrategy.Strategy({
  usernameField: 'email',
  passwordField: 'password'
}, async(email, password, done) => {
  const user = await authHelper.findByEmail(email);

  if (_.isEmpty(user)) {
    return done(new ErrorModel(httpStatus.BAD_REQUEST, ErrorMessageEnum.IncorrectEmail), null);
  }

  const isMatchedPasswords = await user.validatePassword(password);

  if (!isMatchedPasswords) {
    return done(new ErrorModel(httpStatus.BAD_REQUEST, ErrorMessageEnum.IncorrectPassword), null);
  }

  return done(null, user);
}));

passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.get('secretKey')
  }, (jwtPayload, cb) => User.findById(jwtPayload._id)
      .then(user => cb(null, user))
      .catch(err => cb(err))
));
