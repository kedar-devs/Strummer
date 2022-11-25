const reducer=(state='',action)=>{
    if(action.type==='assignToken'){
        state=action.payload
        return state 
    }
    else{
        return state
    }
}
export default reducer