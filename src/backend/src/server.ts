import express, { Express, Request, Response , Application } from 'express';
import config from './configs/config';

const app: Application = express();
const port = config.server.port;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});