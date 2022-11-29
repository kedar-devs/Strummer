let initialState={
    authToken:"None",
    refreshToken:'None'
}

const reducer=(state=initialState,action)=>{
    if(action.type==='assignToken'){
        console.log(action.payload)
        initialState.authToken=action.payload
        return {
            ...state,
            authToken:action.payload
        } 
    }
    else{
        return state
    }
}
export default reducer