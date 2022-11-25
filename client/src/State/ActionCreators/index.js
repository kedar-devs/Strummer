export const AssignAccessToken=(token)=>{
    return (dispatch)=>{
        dispatch({
            type:'assignToken',
            payload:token
        })
    }
}
export const GetAccessToken=(token)=>{
    return (dispatch)=>{
        dispatch({
            type:'getToken',
            payload:token
        })
    }
}