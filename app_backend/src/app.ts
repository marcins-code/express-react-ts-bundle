import express, { Application, Request, Response, NextFunction } from 'express';

// Boot express
const app: Application = express();

// Application routing
app.use('/', (req: Request, res: Response, _next: NextFunction) => {
  res.status(200).send({ data: 'Hello from Oranio AS' });
});

export default app;
