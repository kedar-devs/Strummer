export const AssignAccessToken=(accessToken)=>{
    return (dispatch)=>{
        dispatch({
            type:'assignToken',
            payload:accessToken
        })
    }
}
export const DeleteAccessToken=()=>{
    return (dispatch)=>{
        dispatch({
            type:"SignOut",
            payload:'None'
        })
    }
}