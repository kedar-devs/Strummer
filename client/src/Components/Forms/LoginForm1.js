import React,{useState,useEffect} from 'react'
import {Form,TextFeild,SelectFeild} from './../UI/FormikInput'
import LoginData from './../FormData/LoginUser'
import UserLoginValidation from '../FormValidation/UserLoginValidation'
function LoginForm1() {
    const [initialVal,setInitialVal]=useState({})
    const [FormEleArray,setFormElement]=useState([])
    const [file,setFile]=useState(null)
    useEffect(()=>{
        console.log('In here',LoginData)
        var ele=[]
        var init={}
        for(let key in LoginData.orderForm){
            ele.push({
                id:key,
                config:LoginData.orderForm[key]
            })
            init[key]=''
        }
        console.log(init)
        setFormElement(ele)
        setInitialVal(init)
    },[])
    const getFormElement=(elementName,elementSchema)=>{
        const props={
            name:elementName,
            type:elementSchema.elementConfig.type,
            placeholder:elementSchema.elementConfig.placeholder,
            value:elementSchema.value,
            tagType:elementSchema.elementType,
            options:elementSchema.options?elementSchema.options:' '
        }
        if(props.tagType==='input'){
            return(
                <TextFeild {...props} />
            )
        }
        if(props.tagType==="select"){
            return(
                <SelectFeild {...props} />
            )
        }

    }
  return (
    <div>
        <Form
            initialValues={initialVal}
            validationSchema={UserLoginValidation}
            onSubmit={onSubmit}
            >
                {FormEleArray.map((formElement)=>{
                    return(
                        <>
                        {getFormElement(formElement.id,formElement.config)}
                        </>
                    )
                })}
            </Form>
    </div>
  )
}

export default LoginForm1