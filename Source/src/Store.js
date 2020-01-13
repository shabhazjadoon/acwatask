import {applyMiddleware, createStore} from 'redux';
import reducers from './Reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const midWare = applyMiddleware(thunk,logger);
const store = createStore(reducers,midWare);


export default store;