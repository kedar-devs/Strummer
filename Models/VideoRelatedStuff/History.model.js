const mongoose=require('mongoose')
const Schema=mongoose.Schema
const HistorySchema=Schema({
    ContentId:{type:mongoose.Schema.Types.ObjectId,required:true},
    viewerId:{type:mongoose.Schema.Types.ObjectId,required:true},
    DateTime:{type:Date}
})
const HistoryData=mongoose.model('History',HistorySchema)
module.exports=HistoryData