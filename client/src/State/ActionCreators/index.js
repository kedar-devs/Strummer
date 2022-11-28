export const AssignAccessToken=(accessToken)=>{
    return (dispatch)=>{
        dispatch({
            type:'assignToken',
            payload:accessToken
        })
    }
}
export const GetAccessToken=(accessToken)=>{
    return (dispatch)=>{
        dispatch({
            type:'getToken',
            payload:accessToken
        })
    }
}