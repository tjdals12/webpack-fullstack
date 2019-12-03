import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import router from 'router';
import { swaggerConfig, statsConfig } from 'swagger';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(...swaggerConfig);
app.use(statsConfig);
app.use(router);
app.use(helmet());

export default app;
