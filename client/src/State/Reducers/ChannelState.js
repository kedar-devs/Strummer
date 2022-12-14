let initialState={
    channelId:'None',
    isChannel:false,
    creatorId:'None',
    isCreator:false
}
const reducer=(state=initialState,action)=>{
    
    switch(action.type){
        case 'AssignChannelId':
            initialState.channelId=action.payload
            return {
                ...state,
                channelId:action.payload
            }
       
        case 'AssignCreatorId':
            initialState.creatorId=action.payload
            return {
                ...state,
                creatorId:action.payload
            }
         
        case 'DeleteChannelId':
            initialState.channelId='None'
            return {
                ...state,
                channelId:'None'
            }
          
        case 'DeleteCreatorId':
            initialState.creatorId='None'
            return{
                ...state,
                creatorId:'None'
            }
            
        default:
            return state

    }
}
export default reducer