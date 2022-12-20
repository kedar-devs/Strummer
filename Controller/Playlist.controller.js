const ChannelData = require("../Models/Channel.model")
const PlaylistData = require("../Models/VideoRelatedStuff/PlayList.model")

exports.AddPlayist=async(req,res)=>{
    const {videoCount,channelId}=req.body
    const FoundChannel=await ChannelData.findOne({_id:channelId})
    if(FoundChannel){
    const Playlist={
        videoCount:videoCount,
        channelId:channelId,
        channelName:FoundChannel.channelName,
        contentList:[]
    }
    const newPlaylist=new PlaylistData(Playlist)
    newPlaylist.save((err,playlist)=>{
        if(err){
            return res.status(200).send({err})
        }
        else{
            return res.status(200).send({message:"Playlist Added Succesfully"})
        }
    })
}
}
exports.AddVideoToPlaylist=async(req,res)=>{
    const {id,content}=req.body
    const FoundPlaylist=await PlaylistData.findOne({_id:id})
    FoundPlaylist.videoCount+=1
    FoundPlaylist.contentList.push(content)
    FoundPlaylist.save((err,user)=>{
        if(err){
            return res.status(400).send(err)
        }
        else{
            return res.status(200).send({message:'Video Added Succesfully'})
        }
    })
}
exports.GetAllPlaylist=async(req,res)=>{
    try{
    const AllPlaylist=await PlaylistData.find()
    if(AllPlaylist){
        return res.status(200).send({AllPlaylist})
    }
    else{
        return res.status(404).send({message:'NO playlist was found'})
    }
    }catch(err){
        console.log(err)
    }
}
exports.getChannelPlaylist=async(req,res)=>{
    try{
        const {id}=req.params
        const FoundPlaylist=await PlaylistData.find({channelId:id})
        if(FoundPlaylist){
            return res.status(200).send({FoundPlaylist})
        }
        else{
            return res.status(404).send({message:'NO playlist was found'})
        }
    }catch(err){
        console.log(err)
    }
}
exports.getOnePlaylist=async(req,res)=>{
    try{
        const {id}=req.params
        const FoundPlaylist=await PlaylistData.findOne({_id:id})
        if(FoundPlaylist){
            return res.status(200).send({FoundPlaylist})
        }
        else{
            return res.status(404).send({message:'NO playlist was found'})
        }
    }catch(err){
        console.log(err)
    }
}