import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import * as reducers from './modules';
import rootSaga from './modules/sagas';

const rootReducer = combineReducers(reducers);

const configure = preloadState => {
    const sagaMiddlewares = createSagaMiddleware();

    const store = createStore(
        rootReducer,
        preloadState,
        composeWithDevTools(applyMiddleware(sagaMiddlewares)),
    );

    sagaMiddlewares.run(rootSaga);

    return store;
};

export default configure;
