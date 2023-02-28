import { resolve } from 'path';

require('dotenv').config({ path: resolve(__dirname, '../.env') });
export const env = process.env;

