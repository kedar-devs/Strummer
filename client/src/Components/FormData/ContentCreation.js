let state={
    orderForm:{
        Title:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Video Title'
            },
            value:' ',
            validation:{
                required:false
            },
            valid: true,
            touched: false
        },
        Description:{
            elementType:'input',
            elementConfig:{
                type:'textarea',
                placeholder:"Description of the video"
            },
            value:'',
            validation:{
                required:true
            },
            valid:true,
            touched:false
        },
        photo:{
            elementType:'input',
            elementConfig:{
                type:'file',
                placeholder:"Thumbnail"
            },
            value:'',
            validation:{
                required:true
            },
            valid:true,
            touched:false  
        },
        Video:{
            elementType:'input',
            elementConfig:{
                type:'file',
                placeholder:"Video"
            },
            value:'',
            validation:{
                required:true
            },
            valid:true,
            touched:false  
        },
        Tags:{
            elementType:'multiOption',
            elementConfig:{
                type:'text',
                placeholder:"Tags"
            },
            value:[],
            validation:{
                required:true
            },
            valid:true,
            touched:false 
        },

    },
    axiosRequest:'/Content/NewContent'
}
module.exports=state