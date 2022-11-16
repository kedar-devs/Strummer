const routes=require('express').Router()
const CoachController=require("./../Controller/Creator.Controller")
routes.put("/ChangeName",CoachController.changeName)
routes.put("/AddChannel",CoachController.AddChannel)
routes.get("/DecreaseFollower/:accessToken",CoachController.decreaseFollowers)
routes.get("/IncreaseFollower/:accessToken",CoachController.increaseFollowers)
routes.get("/GetAllCreator",CoachController.getAllCreator)
routes.get("/GetOneUser/:accessToken")
module.exports=routes