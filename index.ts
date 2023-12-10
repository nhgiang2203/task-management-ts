import express, {Express} from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as database from './config/database';

import mainV1Routes from './api/v1/routes/index.route';

dotenv.config();
database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

// const corsOptions = {
  //   origin: 'http://example.com'
  // };
  
  // app.use(cors(corsOptions));
  
  app.use(cors());

//parser application/json
app.use(bodyParser.json());

//Routes V1 
mainV1Routes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});