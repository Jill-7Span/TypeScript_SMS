import { env } from '../common/env';
import mongoose from 'mongoose';

mongoose.set('strictQuery', false);
mongoose.connect(env.MONGO_URL)
  .then(() => {
    console.log('###        MongoDB Connected            ###');
  })
  .catch((error) => {
    console.error('connection error  ', error);
  });

// try {
//   const mongooseDB = mongoose.connect(env.MONGO_URL);
//   console.log("###        MongoDB Connected            ###");
// } catch (error) {
//   console.error('connection error  ', error);
// }
