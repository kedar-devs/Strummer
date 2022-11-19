import React,{useState,useEffect} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import LoginData from './../FormData/LoginUser'
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
        validate={values=>{
            const errors={}
            if (!values.email) {
                errors.email = 'Required';
               
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
               
              }
            if(values.password.length<8){
                errors.password="Password should be min 8 characters long"
            }
            else if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(values.password)){
                errors.password="Password Must contain Minimum eight characters, at least one letter, one number and one special character"
            }
            if(values.contact.length<10){
                errors.contact="Mobile length should be atleast 10 digit long"
            }
            else if(!/^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/i.test(values.contact)){
                errors.contact="Mobile Number Invalid"
            }
            return errors
        }}
        onSubmit={(values,{setSubmitting})=>{
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
        }}
        >
            {({isSubmitting})=>(
                <Form>
                    
                    {FormEleArray.map((ele)=>{
                        return(
                        <>
                    

                        <Field name={ele.id} 
                        type={ele.config.elementConfig.type}
                        value={ele.config.value}
                        placeholder={ele.config.elementConfig.placeholder}
                        />
                        <ErrorMessage name={ele.id} component="div" />
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