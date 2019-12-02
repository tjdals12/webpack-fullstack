import { fork } from 'redux-saga/effects';
import todoSagas from './todo/sagas';

export default function* rootSaga() {
    yield fork(todoSagas);
}
