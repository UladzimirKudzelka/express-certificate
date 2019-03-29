import * as mongoose from 'mongoose';
import * as config from 'config';

const dbConfig = config.get('dbConfig');
const mongodbUri = [
  dbConfig.host,
  dbConfig.username,
  ':',
  dbConfig.password,
  '@ds147225.mlab.com:',
  dbConfig.port,
  '/',
  dbConfig.name
];
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
};

mongoose.connect(mongodbUri.join(''), options)
  .then(() => console.log('Connection to DB established successfully'))
  .catch(error => console.log('Connection to DB failed'));

export default mongoose;
