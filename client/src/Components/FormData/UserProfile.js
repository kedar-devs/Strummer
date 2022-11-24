let state={
    orderForm:{
        name:{
            elementType:"input",
            elementConfig:{
                type:"text",
                placeholder:"Name"
            },
            value:"",
            validation:{
                required:false
            },
            valid: true,
            touched: false,
        },
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
        },
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
        Pp:{
            elementType:"file",
            elementConfig:{
                type:"file",
                placeholder:"Upload file here"
            },
            value:null
        }
    },
    submitText:'REGISTER NOW'
}
module.exports=state