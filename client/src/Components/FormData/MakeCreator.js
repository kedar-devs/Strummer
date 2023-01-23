let state={
    orderForm:{
        name:{
            elementType:"input",
            elementConfig:{
                type:"text",
                placeholder:"Creator Name"
            },
            validation:{
                required:true
            },
            value:'',
            valid:true,
            touched:true
        },
        email:{
            elementType:'input',
            elementConfig:{
                type:"email",
                placeholder:"YourEmail@domain.com"
            },
            validation:{
                required:true
            },
            value:'',
            valid:true,
            touched:true
        },
        password:{
            elementType:'input',
            elementConfig:{
                type:"password",
                placeholder:"Strong Password"
            },
            validation:{
                required:true
            },
            value:'',
            valid:true,
            touched:true
        }
    },
    submitText:'BECOME CREATOR',
    axiosRequest:"/User/MakeCreator",
    userType:"Creator"
}
module.exports=state