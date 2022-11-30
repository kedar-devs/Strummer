let state={
    orderForm:{
        channelName:{
            elementType:"input",
            elementConfig:{
                type:"text",
                placeholder:"Channel Name"
            },
            value:"",
            validation:{
                required:true
            },
            valid: true,
            touched: false,
        },
        About:{
            elementType:"input",
            elementConfig:{
                type:"textholder",
                placeholder:"In brief"
            },
            value:"",
            validation:{
                required:true
            },
            valid: true,
            touched: false,
        },
        socialInsta:{
            elementType:"input",
            elementConfig:{
                type:"text",
                placeholder:"Instagram Link"
            },
            value:"",
            validation:{
                required:true
            },
            valid: true,
            touched: false,
        },
        socialFB:{
            elementType:"input",
            elementConfig:{
                type:"text",
                placeholder:"Facebook Link"
            },
            value:"",
            validation:{
                required:true
            },
            valid: true,
            touched: false,
        },
        socialTwit:{
            elementType:"input",
            elementConfig:{
                type:"text",
                placeholder:"Twitter Link"
            },
            value:"",
            validation:{
                required:true
            },
            valid: true,
            touched: false,
        },
        
    }
}
module.exports=state