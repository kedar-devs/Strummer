const {handleDublicateError,handleValidationError}=require('./HandleError')
exports.ErrorController=(err)=>{
    let response={
        message:'',
        code:0
    }
    try{
        if(err.name==='ValidationError'){
            const mssg=handleValidationError(err)
            response.message=mssg
            response.code=400
        }
        else if(err.code && err.code == 11000){
            const mssg=handleDublicateError(err)
            response.message=mssg
            response.code=409
        }
        return response

    }catch(error){
        response={
            message:'Unkown error Occured',
            code:500
        }
        return response
    }
}