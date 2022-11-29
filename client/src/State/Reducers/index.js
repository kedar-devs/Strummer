import { combineReducers } from "redux";
import AccessToken from "./AccessToken";
const reducers=combineReducers({
    user:AccessToken
})
export default reducers