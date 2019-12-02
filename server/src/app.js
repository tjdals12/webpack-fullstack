import '@babel/polyfill';
import express from 'express';
import router from 'router';
import helmet from 'helmet';

const app = express();

app.use(router);
app.use(helmet());

export default app;
