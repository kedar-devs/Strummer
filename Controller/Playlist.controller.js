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
