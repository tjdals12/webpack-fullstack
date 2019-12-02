import { fork, take, call, put } from 'redux-saga/effects';
import * as api from 'lib/api';
import { getTodosRequest, getTodosSuccess, getTodosFailure } from './action';

function* runGetTodos() {
    try {
        const data = yield call(api.getTodos);

        yield put(getTodosSuccess(data));
    } catch (e) {
        yield put(getTodosFailure());
    }
}

function* requestGetTodos() {
    while (true) {
        yield take(getTodosRequest);
        yield fork(runGetTodos);
    }
}

export default function* todoSagas() {
    yield fork(requestGetTodos);
}
