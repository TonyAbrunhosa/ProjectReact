import { combineReducers } from 'redux';
import { menuReducer } from './Menu/menuReducer';
import { clienteReducer } from './Cliente/clienteReducer';

const mainReducer = combineReducers({
    menu: menuReducer,
    cliente:clienteReducer
})

export default mainReducer;