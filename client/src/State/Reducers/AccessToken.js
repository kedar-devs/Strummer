let initialState={
    authToken:localStorage.getItem("userToken")?localStorage.getItem("userToken"):'None',
    refreshToken:'None'
}

const reducer=(state=initialState,action)=>{
    if(action.type==='assignToken'){
        
        initialState.authToken=action.payload
        return {
            ...state,
            authToken:action.payload
        } 
    }
    else if(action.type==='SignOut'){
        initialState.authToken=action.payload
        localStorage.removeItem('userToken')
        return {
            ...state,
            authToken:'None'
        }
    }
    else{
        return state
    }
}
export default reducer