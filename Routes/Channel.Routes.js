const ChannelController=require('./../Controller/Channel.controller')
const routes=require('express').Router()
routes.post("/Creator/AddChannel",ChannelController.AddChannel)
routes.post("/Creator/AddSubscriber",ChannelController.AddSubscriber)
routes.put("/Creator/EditChannelName",ChannelController.editChannelName)
routes.put("/Creator/RemoveSubscriber",ChannelController.removeSubscriber)
routes.put("/Creator/EditSocials",ChannelController.editSocial)
module.exports=routes