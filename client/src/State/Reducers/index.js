import { combineReducers } from "redux";
import AccessToken from "./AccessToken";
import ChannelState from './ChannelState'
const reducers=combineReducers({
    user:AccessToken,
    channel:ChannelState
})
export default reducers