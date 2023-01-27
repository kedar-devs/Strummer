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
    axiosRequest:"/User/Login",
    userType:'User'
}
module.exports=state