import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import { gradeRouter } from './routes/gradeRouter.js';
//import { logger } from './config/logger.js';
import { db } from './models/index.js';

dotenv.config();

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    //logger.info('Conectado ao banco de dados');
  } catch (error) {
    //logger.error(`Erro ao conectar no banco de dados! ${error}`);

    process.exit();
  }
})();

const app = express();

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    //origin: 'http://localhost:3000',
    origin: 'https://thawing-beyond-44412.herokuapp.com',
  })
);

app.use(gradeRouter);

app.get('/', (_, res) => {
  res.send('API em execucao');
});

app.listen(process.env.PORT || 8081, () => {
  //logger.info(`Servidor em execucao na porta ${process.env.PORT}`);
  console.log(`Servidor em execucao na porta ${process.env.PORT}`);
});
