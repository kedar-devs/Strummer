let state={
    orderForm:{
        name:{
            elementType:"input",
            elementConfig:{
                type:"name",
                placeholder:"Name"
            },
            value:"",
            validation:{
                required:false
            },
            valid: true,
            touched: false,
        },
        Pp:{
            elementType:"file",
            elementConfig:{
                type:"file",
                placeholder:"Upload file here"
            },
            value:null
        }
    }
}