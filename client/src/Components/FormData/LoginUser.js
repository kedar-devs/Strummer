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
        },
        password:{
            elementType:"input",
            elementConfig:{
                type:"password",
                placeholder:"Password"
            },
            value:"",
            validation:{
                required:true
            },
            valid:false,
            touched:false
        }
    },
    resetMessage:'Forgot Password',
    resetLink:'/ResetPassword',
    additionMessage:'Login With Mobile',
    additionLink:'/loginMobile',
    axiosRequest:"/User/Login",
    userType:'User'
}
module.exports=state