import { resolve } from 'path';

require('dotenv').config({ path: resolve(__dirname, '../.env') });
const env = process.env;

export { env };
