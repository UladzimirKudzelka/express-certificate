import * as bcrypt from 'bcrypt';
import * as config from 'config';
import * as jwt from 'jsonwebtoken';

import mongoose from '../../context';
import { UserDocument } from '../../models';
import { RoleEnum } from '../../enums';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: RoleEnum.User,
    enum: [ RoleEnum.User, RoleEnum.Admin ]
  }
}, { versionKey: false });

userSchema.methods.encryptPassword = async function(password) {
  this.password = await bcrypt.hash(password, 10);
};

userSchema.methods.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateJWT = function() {
  return `bearer ${ jwt.sign(this.toObject(), config.get('secretKey'), { expiresIn: 86400000 }) }`;
};

export default mongoose.model<UserDocument>('user', userSchema);
