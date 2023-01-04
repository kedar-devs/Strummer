const ChannelData = require("../Models/Channel.model")
const HistoryData = require("../Models/VideoRelatedStuff/History.model")

exports.AddHistory=async(req,res)=>{
    try{

        console.log(req.body)
        const {contentId,userId}=req.body
        const History={
            ContentId:contentId,
            viewerId:userId,
            DateTime:new Date()
        }
        const newHistory=new HistoryData(History)
        return newHistory.save((err,result)=>{
            if(err){
                console.log(err)
                return res.status(400).send({message:err})
            }
            else{
                return res.status(200).send({result})
            }

        })
        
    }
    catch(err){
        console.log(err)
        return res.status(400).send({message:err})
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
exports.GetHistory=async(req,res)=>{
    try{
         const {id}=req.params
         var result=[]
         const FoundVideos=await HistoryData.find({viewerId:id})
         if(FoundVideos){
            let content
            for(let i=0;i<FoundVideos.length;i++){
                content=await ChannelData.findOne({_id:FoundVideos[i].ContentId})
                if(content)
                result.push(content)
            }
            console.log(result)
            return res.status(200).send({result})
         }
         else{
            return res.status(404).send({message:'You No History'})
         }

    }catch(err){
        console.log(err)
        return res.status(400).send({message:err})   
    }
}