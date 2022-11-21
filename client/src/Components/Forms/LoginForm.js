import React,{useState,useEffect} from 'react'
import { Formik, Form, Field } from 'formik'
import LoginData from './../FormData/LoginUser'
import UserLoginValidation from '../FormValidation/UserLoginValidation'
// import { set } from 'mongoose'
function LoginForm() {
    const [initialVal,setInitialVal]=useState({})
    const [FormEleArray,setFormElement]=useState([])
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
  return (
    <div>
        <Formik
        initialValues={initialVal}
        validationSchema={UserLoginValidation}
        onSubmit={(values,{setSubmitting})=>{
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
        }}
        >
            {({values,errors,touched,handleChange,isSubmitting})=>(
                <Form>
                    
                    {FormEleArray.map((ele)=>{
                        return(
                        <>
                       
                        <Field
                        type={ele.config.elementConfig.type}
                        placeholder={ele.config.elementConfig.placeholder}
                        value={values[ele.id]}
                        onChange={handleChange}
                        name={ele.id}
                        />
                        {errors[ele.id] && touched[ele.id] ? <>{errors[ele.id]} </>: null}
                        </>
                        )
                    })}
                     <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                </Form>
            )}

        </Formik>
    </div>
  )
}

export default LoginForm