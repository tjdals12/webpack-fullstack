import { Router } from 'express';
import * as todoCtrl from './todo.ctrl';

const todo = Router();

todo.get('/', todoCtrl.getTodos);

export default todo;
