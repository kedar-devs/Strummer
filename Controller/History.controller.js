const HistoryData = require("../Models/VideoRelatedStuff/History.model")

exports.AddHistory=async(contentId,userId)=>{
    try{
        const History={
            ContentId:contentId,
            viewerId:userId,
            DateTime:new Date()
        }
        const newHistory=new HistoryData(History)
        return newHistory.save((err,result)=>{
            if(err){
                console.log(err)
                return false
            }
            else{
                return true
            }

        })
        
    }
    catch(err){
        console.log(err)
        return false
    }
}
exports.deleteHistory=async(req,res)=>{
    try{
    const {id}=req.params
    const FoundHistory=await HistoryData.findOneAndDelete({_id:id})
    if(FoundHistory){
        return res.status(200).send({message:'Deletion was Done'})
    }
    else{
        return res.status(404).send({message:'No User Found'})
    }
}catch(err){
    console.log(err)
    return res.status(400).send(err)
}
}