import {createStore,applyMiddleware} from 'redux'
import thunk from  'redux-thunk'
import reducers from '../reducers'
import initialState from './initialState.json'

export default applyMiddleware(thunk)(createStore)(
    reducers/*,
    initialState*/
);