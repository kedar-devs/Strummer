const routes=require('express').Router()
const ContentController=require("./../Controller/Content.controller")
const PlayListController=require("./../Controller/Playlist.controller")
const ReplyController=require('./../Controller/Reply.controller')
const CommentController=require('./../Controller/Comment.controller')
const HistoryController=require('./../Controller/History.controller')
routes.post("/NewContent",ContentController.CreateNewContent)
routes.get("/AddLike/:id",ContentController.AddLikes)
routes.get("/RemoveLike/:id",ContentController.RemoveLikes)
routes.get("/AddDislikes/:id",ContentController.AddDislike)
routes.get("/RemoveDisLike/:id",ContentController.RemoveDislike)
routes.get("/IncreaseCount/:id",ContentController.IncreaseViewCount)
routes.put("/AddReport/:id",ContentController.AddReportCount)
routes.put("/searchContent",ContentController.searchTags)
routes.put("/ChangeApproval",ContentController.ChangeApproval)
routes.put("/Content/AddTags/:id",ContentController.AddTags)
routes.put("/Content/DeleteTags/:id",ContentController.DeleteTags)
routes.post("/CreatePlaylist",PlayListController.AddPlayist)
routes.post("/Playlist/Video",PlayListController.AddVideoToPlaylist)
routes.post("/video/Comment",CommentController.AddComment)
routes.post("/Video/AddReply/:id",ReplyController.AddReply)
routes.post("/Video/AddHistory",HistoryController.AddHistory)

routes.get("/Video/Reply/Like/:id",ReplyController.AddLike)
routes.get('/video/Comment/getComment/:id',CommentController.GetComment)
routes.get('/video/Comment/AddLike/:id',CommentController.AddLike)
routes.get('/video/Comment/RemoveLike/:id',CommentController.RemoveLike)
routes.get('/video/Comment/AddDislike/:id',CommentController.AddDislike)
routes.get('/video/Comment/RemoveDisLike/:id',CommentController.RemoveDisLike)
routes.get('/video/Comment/IncreaseReply',CommentController.IncreaseCount)
routes.get("/Video/Reply/RemoveLike/:id",ReplyController.RemoveLike)
routes.get("/video/Reply/Dislike/:id",ReplyController.RemoveDisLike)
routes.get("/video/Reply/RemoveDisLike/:id",ReplyController.RemoveDisLike)
routes.get("/GetChannel/:id",ContentController.getChannel)
routes.get("/GetContent",ContentController.GetContent)
routes.get("/GetOneContent/:id",ContentController.getOneContent)
routes.get("/GetCreator/:id",ContentController.getCreator)
routes.get("/Playlist/GetOne/:id",PlayListController.getOnePlaylist)
routes.get("/Playlist/GetChannelPlaylist/:id",PlayListController.getChannelPlaylist)
routes.get("/Playlist/GetAllPlaylist",PlayListController.GetAllPlaylist)
routes.get("/history/delete",HistoryController.deleteHistory)
routes.get("/history/getAll/:id",HistoryController.GetHistory)
routes.get("/search/:key",ContentController.ContentSearch)
module.exports=routes
