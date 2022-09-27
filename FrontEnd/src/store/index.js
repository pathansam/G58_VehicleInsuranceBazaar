import { combineReducers, createStore } from 'redux'
import addPolicyReducer from './addPolicyReducer';
import reducer from './reducer'

//const store=createStore(reducer)
//export default store;

const combreducer=combineReducers({loggedin:reducer,policy:addPolicyReducer});
const store=createStore(combreducer)
export default store;
