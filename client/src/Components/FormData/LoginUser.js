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
            elementType:"password",
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
    }
}
module.exports=state