let state={
    orderForm:{
        password:{
            elementType:"input",
            elementConfig:{
                type:"password",
                placeholder:"New Password"
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
    resetLink:'',
    additionMessage:'',
    additionLink:'',
    axiosRequest:"/User/ResetPassWord",
    userType:'Reset'
}
module.exports=state