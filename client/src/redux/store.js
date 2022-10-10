import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'; //es un middleware que nos permite utilizar axios
import rootReducer from './reducer'; //va a recibir todo lo que traiga el dispach y lo vuelve a mandar


const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;