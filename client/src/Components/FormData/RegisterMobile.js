let state={
    orderForm:{
        contact:{
            elementType:"input",
            elementConfig:{
                type:"number",
                placeholder:"Contact Number"
            },
            value:"",
            validation:{
                required:true
            },
            valid:false,
            touched:true
        }
    },
    resetMessage:'Resend Otp',
    resetLink:'/resendOtp',
    additionMessage:'Login With Email',
    additionLink:'/login',
    axiosRequest:"/User/VerifyMobile",
    userType:"User"
}
module.exports=state