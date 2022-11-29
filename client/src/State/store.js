import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk'
import Reducers from "./Reducers";
import { composeWithDevTools } from '@redux-devtools/extension';

const Store=createStore(Reducers,{},composeWithDevTools(applyMiddleware(thunk)))

export default Store