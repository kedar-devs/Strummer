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
        },
        otp:{
            elementType:"input",
            elementConfig:{
                type:"text",
                placeholder:"OTP"
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
    resetLink:'/resendOtp'

}
module.exports=state