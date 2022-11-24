import React,{useState,useEffect} from 'react'
import { Formik, Form, Field } from 'formik'
//import GraphicEqIcon from '@mui/icons-material/GraphicEq';
function RegisterForm(props) {
    const [FormEleArray,setFormElement]=useState([])
    const [initialVal,setInitialVal]=useState({})
    //const [otherDetails,setOtherDetails]=useState([])
    const [UserRegisterValidation,setValidationSchema]=useState({})

    useEffect(()=>{
        let RegisterData=props.RegisterData
        let ele=[]
        let init={}
        setValidationSchema(props.UserRegisterValidation)
        for(let key in RegisterData){
            ele.push({
                id:key,
                config:RegisterData.orderForm[key]
            })
            init[key]=''
        }
        setFormElement(ele)
        setInitialVal(init)

    },[])
  return (
    <div>
        <Formik
        initialValues={initialVal}
        validationSchema={UserRegisterValidation}
        onSubmit={(values,{setSubmitting})=>{
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
        }}
        >
            {({values,errors,handleChange,isSubmitting})=>(
            <Form>
                {FormEleArray.map((ele)=>{
                    <div>
                        <Field
                        type={ele.elementConfig.type}
                        placeholder={ele.elementConfig.placeholder}
                        value={values[ele]}
                        onChange={handleChange}
                        name={ele.id}
                        />
                        {errors[ele.id] && touched[ele.id] ? <div className='text-red-500 text-xs italic'>{errors[ele.id]} </div>: null}
                    </div>
                })}
            </Form>    
            )}

        </Formik>
    </div>
  )
}

export default RegisterForm