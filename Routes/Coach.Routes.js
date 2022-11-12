const routes=require('express').Router()
const CoachController=require("./../Controller/Creator.Controller")
routes.put("/ChangeName",CoachController.changeName)
routes.put("/AddChannel",CoachController.AddChannel)
routes.put("/DecreaseFollower",CoachController.decreaseFollowers)
routes.put("/IncreaseFollower",CoachController.increaseFollowers)
module.exports=routes