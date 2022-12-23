export const AddChannelId=(channelId)=>{
    return(dispatch)=>{
        dispatch({
            type:'AssignChannelId',
            payload:channelId
        })
    }
}
export const AddCreatorId=(creatorId)=>{
    return (dispatch)=>{
        dispatch({
            type:'AssignCreatorId',
            payload:creatorId
        })
    }
}
export const DeleteChannelId=()=>{
    return(dispatch)=>{
        dispatch({
            type:'DeleteChannelId',
            payload:'None'
        })
    }
}
export const DeleteCreatorId=()=>{
    return(dispatch)=>{
        dispatch({
            type:'DeleteCreatorId',
            payload:'None'
        })
    }
}