import { Router } from 'express';
import * as todoCtrl from './todo.ctrl';

const todo = Router();

todo.get('/', todoCtrl.getTodos);
todo.get('/:id', todoCtrl.getTodo);

export default todo;
