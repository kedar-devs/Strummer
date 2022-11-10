const routes=require('express').Router()
const ContentController=require("./../Controller/Content.controller")
routes.post("/Content/NewContent",ContentController.CreateNewContent)
routes.get("/Content/AddLike/:id",ContentController.AddLikes)
routes.get("/Content/AddDislikes/:id",ContentController.AddDislike)
routes.get("/Content/AddReport/:id",ContentController.AddReportCount)
routes.put("/Content/ChangeApproval",ContentController.ChangeApproval)
module.exports=routes
