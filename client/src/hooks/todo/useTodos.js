import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTodosRequest } from 'store/modules/todo';

export default function useTodos() {
    const todos = useSelector(state => state.todo.todos);
    const dispatch = useDispatch();
    const getTodos = useCallback(() => dispatch(getTodosRequest()));

    return {
        todos,
        getTodos,
    };
}
