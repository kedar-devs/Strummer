export const AssignAccessToken=(accessToken)=>{
    return (dispatch)=>{
        dispatch({
            type:'assignToken',
            payload:accessToken
        })
    }
}