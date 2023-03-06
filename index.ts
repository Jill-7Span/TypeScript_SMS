import express, { Request, Response } from 'express';
import { Routes } from './routes';
import { env } from './common/env';

const router = new Routes();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router.route);

app.use('/', (req: Request, res: Response) => {
  res.status(400).json({ Message: 'Invalid Route' });
});

app.listen(env.PORT, () => {
  console.log(`###       PORT RUNNING ON ${env.PORT}          ###`);
});

console.log('he;lloo');
