import { createAction } from 'redux-actions';

export const GET_TODOS_REQUEST = 'todos/GET_TODOS_REQUEST';
export const GET_TODOS_SUCCESS = 'todos/GET_TODOS_SUCCESS';
export const GET_TODOS_FAILURE = 'todos/GET_TODOS_FAILURE';

export const getTodosRequest = createAction(GET_TODOS_REQUEST);
export const getTodosSuccess = createAction(GET_TODOS_SUCCESS);
export const getTodosFailure = createAction(GET_TODOS_FAILURE);
