const routes=require('express').Router()
const UserController=require('./../Controller/User.Controller')
const CreatorController=require('./../Controller/Creator.Controller')
const StripeController=require('./../Helper/Stripe')
routes.post("/AddNewUser",UserController.RegisterUser)
routes.post("/VerifyMobile",UserController.RegisterUserMobile)
routes.post("/Login",UserController.LoginUser)
routes.post("/LoginMobile",UserController.LoginUserMobile)
routes.put("/RegisterMobile",UserController.SendOTP)
routes.put("/ResetPassWord",UserController.ResetPassword)
routes.put("/ForgotPassword",UserController.generateResetLink)
routes.put("/EditProfile",UserController.EditProfile)
routes.put("/EditContact",UserController.EditContact)
routes.post("/MakeCreator",UserController.BecomeCreator)
routes.post('/LoginCreator',CreatorController.loginCreator)
routes.get("/GetAll",UserController.getAlluser)
routes.get("/GetOne/:token",UserController.getOneUser)
routes.get('/GetUserId/:token',UserController.getUserId)
routes.get('/GetUserImage/:token',UserController.getUserImage)
routes.post('/payment',StripeController.chargeNewuser)
module.exports=routes