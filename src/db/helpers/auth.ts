import { User } from '../schemas';
import { UserDocument } from '../../models';

const create = async(data: UserDocument) => {
  const user = await new User(data);

  await user.encryptPassword(data.password);

  return user.save();
};

const findByEmail = (email: string) => User.findOne({ email });

export default {
  create,
  findByEmail
};
