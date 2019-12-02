import { handleActions } from 'redux-actions';
import { GET_TODOS_SUCCESS, GET_TODOS_FAILURE } from './action';

const initialState = {
    todos: [],
    error: null,
};

export default handleActions(
    {
        [GET_TODOS_SUCCESS]: (state, action) => {
            const { data } = action.payload;

            return {
                ...state,
                todos: data,
            };
        },
        [GET_TODOS_FAILURE]: (state, action) => {
            const { data } = action.payload;

            return {
                ...state,
                error: data,
            };
        },
    },
    initialState,
);
