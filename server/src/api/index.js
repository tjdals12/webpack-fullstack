import { Router } from 'express';
import todo from './todo';

const api = Router();

api.use('/todos', todo);

export default api;
