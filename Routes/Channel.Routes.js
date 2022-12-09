const ChannelController=require('./../Controller/Channel.controller')
const routes=require('express').Router()
routes.post("/AddChannel",ChannelController.AddChannel)
routes.put("/editImage/:id",ChannelController.editChannelImage)
routes.get("/AddSubscriber/:_id",ChannelController.AddSubscriber)
routes.put("/EditChannelName",ChannelController.editChannelName)
routes.get("/RemoveSubscriber/:_id",ChannelController.removeSubscriber)
routes.put("/EditSocials",ChannelController.editSocial)
routes.get("/getAllChannel",ChannelController.GetAllChannel)
routes.get("/GetCreatorsCahnnel/:creator",ChannelController.getCreatorChannel)
routes.get("/GetOneChannel/:id",ChannelController.getOneChannel)
module.exports=routes