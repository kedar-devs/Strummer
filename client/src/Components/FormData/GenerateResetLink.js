let state={
    orderForm:{
        email:{
            elementType:'input',
            elementConfig:{
                type:"email",
                placeholder:"Youremail@domain.com"
            },
            value:"",
            validation:{
                required:true
            },
            valid:false,
            touched:false
        }
    },
    resetMessage:' ',
    resetLink:' ',
    additionMessage:' ',
    additionLink:' ',
    axiosRequest:"/User/ForgotPassword",
    userType:'User'
}
module.exports=state