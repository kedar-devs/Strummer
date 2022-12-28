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
        channelImage:{
            elementType:"input",
            elementConfig:{
                type:"file",
                placeholder:"Your Channel Pic"
            },
            value:null,
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
        
    },
    submitText:'Submit',
    axiosRequest:'http://localhost:5000/Channel/AddChannel',
    userType:"Channel"
}
module.exports=state