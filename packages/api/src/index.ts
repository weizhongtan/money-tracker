import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.end('hello world');
});

app.listen(9999, () => {
  console.log('listening');
});
